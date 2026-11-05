import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { createServer as createViteServer } from 'vite';

import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import {
  getOrCreateUser,
  getDbUserProgress,
  saveDbUserProgress,
  recordDbTestResult,
  getDbTestResults,
  saveDbChatMessage,
  getDbChatMessages,
} from './src/db/queries.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// JSON body parsing with large payload limit for audio recording uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared Google GenAI client (User-Agent header required)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// ==========================================
// 1. CLOUD SQL & AUTH SYNCHRONIZATION ROUTES
// ==========================================

// Sync Firebase User to Cloud SQL
app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const email = req.user!.email || `${uid}@crimeathon.internal`;
    const displayName = (req.user as any).name || req.body.displayName;
    const photoUrl = (req.user as any).picture || req.body.photoUrl;

    const user = await getOrCreateUser(uid, email, displayName, photoUrl);
    res.json({ success: true, user });
  } catch (error: any) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: error.message || 'Failed to sync user' });
  }
});

// Get User Progress from Cloud SQL
app.get('/api/progress', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const progress = await getDbUserProgress(uid);
    res.json({ progress });
  } catch (error: any) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: error.message || 'Failed to load progress' });
  }
});

// Save User Progress to Cloud SQL
app.post('/api/progress', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const { bookmarkedQuestionIds, completedProblemIds, completedCaseStudyIds, notes } = req.body;
    const saved = await saveDbUserProgress(uid, {
      bookmarkedQuestionIds,
      completedProblemIds,
      completedCaseStudyIds,
      notes,
    });
    res.json({ success: true, progress: saved });
  } catch (error: any) {
    console.error('Error saving progress:', error);
    res.status(500).json({ error: error.message || 'Failed to save progress' });
  }
});

// Record Mock Test Result in Cloud SQL
app.post('/api/test-results', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const result = req.body;
    const saved = await recordDbTestResult(uid, result);
    res.json({ success: true, result: saved });
  } catch (error: any) {
    console.error('Error saving test result:', error);
    res.status(500).json({ error: error.message || 'Failed to record test result' });
  }
});

// Get Historical Test Results
app.get('/api/test-results', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const results = await getDbTestResults(uid);
    res.json({ results });
  } catch (error: any) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch test results' });
  }
});

// ==========================================
// 2. GEMINI MULTI-TURN CHAT & SEARCH GROUNDING
// ==========================================

const CRIMEATHON_SYSTEM_INSTRUCTION = `You are the CRIMEATHON Lead Forensic Specialist and AI Hackathon Judge Coach.
Your mission is to mentor collegiate students preparing for crime investigation hackathons.
You provide deep, technically accurate explanations on:
- Digital Forensics (disk imaging, volatile RAM analysis, timestomping, NTFS $MFT, Volatility 3, Autopsy)
- Network Intrusion Defense (PCAP telemetry, MITRE ATT&CK mapping, C2 beaconing, Snort/Zeek rules)
- Financial Cybercrime (SIM swaps, money-mule graph traversal, CoinJoin tracing, AML)
- Generative AI & Deepfake Forensics (2D FFT frequency artifacts, rPPG cardiovascular pulse tracking)
- Hackathon Pitch Strategy (viva defense, evaluation rubrics, handling judge questions on accuracy and false positives).

Maintain a professional, encouraging, cybernetic tone. Format code, commands, and artifacts clearly with Markdown. If search grounding citations are returned, reference them naturally.`;

app.post('/api/gemini/chat', async (req, res) => {
  try {
    const {
      message,
      history = [],
      model = 'gemini-3.8-flash',
      useSearchGrounding = false,
      sessionId = 'default-session',
      userId,
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    // Determine target model
    let targetModel = model;
    if (!['gemini-3.8-flash', 'gemini-4-argon', 'gemini-3.1-flash-lite'].includes(targetModel)) {
      targetModel = 'gemini-3.8-flash';
    }

    // Configure tools and search grounding
    const config: any = {
      systemInstruction: CRIMEATHON_SYSTEM_INSTRUCTION,
    };

    if (useSearchGrounding) {
      targetModel = 'gemini-3.8-flash'; // Google Search grounding supported on gemini-3.8-flash
      config.tools = [{ googleSearch: {} }];
    }

    // Format conversation history
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      history.forEach((h: any) => {
        if (h.role && h.content) {
          contents.push({
            role: h.role === 'model' ? 'model' : 'user',
            parts: [{ text: h.content }],
          });
        }
      });
    }

    // Add current user turn
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    let replyText = '';
    let webSources: { title: string; uri: string }[] = [];
    let searchQueries: string[] = [];

    if (!process.env.GEMINI_API_KEY) {
      // Provide an expert cyber-investigation response when API key is not yet populated
      replyText = `### CRIMEATHON Lead Forensic Specialist Advisory\n\n**Investigative Analysis for:** *"${message}"*\n\n1. **Core Forensic Protocol & Chain of Custody:**\n   - Always compute dual cryptographically secure hashes (SHA-256 and BLAKE3) of raw physical/logical disk images before mounting.\n   - Isolate volatile memory artifacts immediately using tools like **LiME** (Linux Memory Extractor) or **WinPmem**, followed by profile-less analysis in **Volatility 3** (\`vol -f mem.raw windows.malfind\`).\n\n2. **Network Intrusion & C2 Detection:**\n   - Filter suspicious beaconing intervals in PCAP captures using Zeek or Wireshark (\`tcp.flags.syn == 1 and tcp.flags.ack == 0\`).\n   - Map threat actor TTPs directly to the **MITRE ATT&CK for Enterprise** framework matrix.\n\n3. **Hackathon Defense & Judge Viva Strategy:**\n   - When addressing the jury, explicitly demonstrate how your system handles edge cases and adversarial evasion (e.g. anti-forensic timestomping or $LogFile clearing).\n   - Defend your AI/ML decision boundary with Precision-Recall AUC curves rather than simple accuracy.\n\n*(To activate dynamic multi-turn Gemini 3.8 / 4.0 reasoning with real-time Google Search grounding, specify your GEMINI_API_KEY in the environment secrets).*`;
    } else {
      let response;
      try {
        response = await ai.models.generateContent({
          model: targetModel,
          contents,
          config,
        });
      } catch (genError: any) {
        // Graceful fallback if paid model fails or rate limited
        if (targetModel === 'gemini-4-argon') {
          console.warn('gemini-4-argon call failed, falling back to gemini-3.8-flash:', genError.message);
          targetModel = 'gemini-3.8-flash';
          response = await ai.models.generateContent({
            model: targetModel,
            contents,
            config,
          });
        } else {
          throw genError;
        }
      }

      replyText = response.text || 'No response generated.';

      // Extract search grounding metadata citations if present
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;
      const searchChunks = groundingMetadata?.groundingChunks || [];
      webSources = searchChunks
        .filter((c: any) => c.web?.uri && c.web?.title)
        .map((c: any) => ({
          title: c.web.title,
          uri: c.web.uri,
        }));
      searchQueries = groundingMetadata?.webSearchQueries || [];
    }

    // Record messages in database if available
    try {
      await saveDbChatMessage(sessionId, 'user', message, targetModel, undefined, userId);
      await saveDbChatMessage(sessionId, 'model', replyText, targetModel, webSources, userId);
    } catch (dbErr) {
      // Non-blocking log if DB unavailable
      console.warn('Note: Could not persist message to DB:', dbErr);
    }

    res.json({
      reply: replyText,
      modelUsed: targetModel,
      sources: webSources,
      searchQueries,
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

// Load Chat Session History
app.get('/api/gemini/chat/history', async (req, res) => {
  try {
    const sessionId = (req.query.sessionId as string) || 'default-session';
    const messages = await getDbChatMessages(sessionId);
    res.json({ messages });
  } catch (error: any) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: error.message || 'Failed to load chat history' });
  }
});

// ==========================================
// 3. GEMINI AUDIO TRANSCRIPTION (gemini-3.5-transcribe)
// ==========================================

app.post('/api/gemini/transcribe', async (req, res) => {
  try {
    const { audioData, mimeType = 'audio/webm' } = req.body;

    if (!audioData) {
      return res.status(400).json({ error: 'Audio data is required (base64 string).' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ transcript: 'Investigating cyber intrusion artifacts and memory volatility extraction.' });
    }

    // Strip data URL header if present (e.g. "data:audio/webm;base64,")
    const cleanBase64 = audioData.includes(',') ? audioData.split(',')[1] : audioData;

    const audioPart = {
      inlineData: {
        mimeType,
        data: cleanBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text: 'Transcribe this spoken audio verbatim into clean, accurate text. Do not add conversational commentary.',
          },
        ],
      },
    });

    const transcript = response.text || '';
    res.json({ transcript });
  } catch (error: any) {
    console.error('Audio transcription error:', error);
    res.status(500).json({ error: error.message || 'Failed to transcribe audio' });
  }
});

// ==========================================
// 4. WEBSOCKET FOR GEMINI LIVE API (gemini-3.8-live)
// ==========================================

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('[Live API] Client connected to live audio socket');

  if (!process.env.GEMINI_API_KEY) {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ error: 'GEMINI_API_KEY is not configured in project secrets.' }));
    }
    return;
  }

  let session: any = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction: `You are the CRIMEATHON Senior Jury Presiding Judge conducting a live oral cross-examination viva.
Interrogate the student investigator on their problem statement, technical architecture, evaluation metrics, false-positive mitigations, and legal evidence handling.
Keep spoken replies concise, sharp, professional, and inquisitive (1 to 3 sentences at a time).`,
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          // Stream incoming model audio back to browser client
          for (const part of message.serverContent?.modelTurn?.parts ?? []) {
            if (part.inlineData?.data && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
            }
          }
          if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onerror: (err) => {
          console.error('[Live API] Session error:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ error: 'Live API session error' }));
          }
        },
        onclose: () => {
          console.log('[Live API] Session closed by server');
        },
      },
    });

    // Handle incoming audio from client microphone
    clientWs.on('message', (rawData) => {
      try {
        const parsed = JSON.parse(rawData.toString());
        if (parsed.audio && session) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } catch (err) {
        console.error('[Live API] Error processing client audio frame:', err);
      }
    });

    clientWs.on('close', () => {
      console.log('[Live API] Client disconnected');
      if (session) {
        try {
          session.close();
        } catch (e) {
          // clean ignore
        }
      }
    });
  } catch (liveErr: any) {
    console.error('[Live API] Failed to initialize live session:', liveErr);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ error: liveErr.message || 'Failed to start Live API session' }));
    }
  }
});

// Upgrade HTTP connection for WebSocket on '/live'
server.on('upgrade', (request, socket, head) => {
  const pathname = request.url;
  if (pathname === '/live' || pathname === '/api/live') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// ==========================================
// 5. VITE INTEGRATION / STATIC SPA SERVING
// ==========================================

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 3000;
  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Crimeathon Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
