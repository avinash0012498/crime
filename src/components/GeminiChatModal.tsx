import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Search,
  Mic,
  MicOff,
  Globe,
  Loader2,
  Bot,
  User as UserIcon,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  Zap,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  modelUsed?: string;
  sources?: { title: string; uri: string }[];
  searchQueries?: string[];
  timestamp: string;
}

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveVoice: () => void;
}

export const GeminiChatModal: React.FC<GeminiChatModalProps> = ({
  isOpen,
  onClose,
  onOpenLiveVoice,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hello Investigator! I am your **CRIMEATHON AI Forensic Specialist & Judge Coach**.\n\nI can help you:\n- **Cross-examine your project defense** and viva responses\n- **Audit forensic workflows** (Volatility, Autopsy, $MFT, PCAPs)\n- **Search Google** for live 2026 CVEs, legal precedents, and threat intel\n- **Review your architecture** against false positives and class imbalance\n\nHow can I assist your hackathon team today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [useSearchGrounding, setUseSearchGrounding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for multi-turn context
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          model: selectedModel,
          useSearchGrounding,
          sessionId: 'crimeathon-session-1',
          userId: user?.uid,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      const modelMessage: ChatMessage = {
        id: 'msg-model-' + Date.now(),
        role: 'model',
        content: data.reply,
        modelUsed: data.modelUsed,
        sources: data.sources,
        searchQueries: data.searchQueries,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'model',
          content: `⚠️ Error: ${err.message || 'Unable to connect to Gemini API. Please verify server connection.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Audio Recording & gemini-3.5-transcribe
  const handleToggleRecordAudio = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          // Release mic tracks
          stream.getTracks().forEach((track) => track.stop());

          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setIsTranscribing(true);

          try {
            // Convert to base64
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
              const base64Audio = reader.result as string;

              // Send to server-side gemini-3.5-transcribe route
              const res = await fetch('/api/gemini/transcribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  audioData: base64Audio,
                  mimeType: 'audio/webm',
                }),
              });

              const data = await res.json();
              if (res.ok && data.transcript) {
                setInputValue((prev) => (prev ? `${prev} ${data.transcript}` : data.transcript));
              } else {
                console.error('Transcription error:', data.error);
              }
              setIsTranscribing(false);
            };
          } catch (e) {
            console.error('Failed to process recorded audio:', e);
            setIsTranscribing(false);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Microphone access denied:', err);
        alert('Microphone permission is required for voice transcription.');
      }
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: `Conversation reset. Ready for your next investigation query or viva defense drill.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-4xl w-full h-[90vh] max-h-[820px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Chat Header */}
        <div className="p-4 border-b border-slate-800 bg-[#0a0d16] flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Title & Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>CRIMEATHON AI INVESTIGATOR</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Multi-Turn Forensics Assistant & Viva Coach
              </div>
            </div>
          </div>

          {/* Model & Grounding Controls */}
          <div className="flex items-center gap-2">
            
            {/* Model Selector */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs font-mono">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-transparent text-slate-200 text-xs font-mono focus:outline-none pr-1"
                title="Select Gemini Model Tier"
              >
                <option value="gemini-3.8-flash">gemini-3.8-flash (General)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
                <option value="gemini-4-argon">gemini-4-argon (Complex)</option>
              </select>
            </div>

            {/* Google Search Grounding Toggle */}
            <button
              onClick={() => setUseSearchGrounding(!useSearchGrounding)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all ${
                useSearchGrounding
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-sm shadow-sky-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Ground response with live Google Search queries and verified citations"
            >
              <Globe className={`w-3.5 h-3.5 ${useSearchGrounding ? 'text-sky-400' : ''}`} />
              <span className="hidden sm:inline">Google Search</span>
            </button>

            {/* Switch to Live API Voice Mode */}
            <button
              onClick={() => {
                onClose();
                onOpenLiveVoice();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
              title="Launch Real-Time Live Voice Interrogation"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voice Viva (Live)</span>
            </button>

            {/* Clear conversation */}
            <button
              onClick={handleClearHistory}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-900"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-900 ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';

            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                    isUser
                      ? 'bg-sky-500/20 border border-sky-400/40 text-sky-300'
                      : 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                  }`}
                >
                  {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-sky-950/40 border-sky-500/30 text-slate-100 rounded-tr-none'
                      : 'bg-slate-900/90 border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  {/* Meta strip for model replies */}
                  {!isUser && m.modelUsed && (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1.5">
                      <span className="text-emerald-400 font-bold">{m.modelUsed}</span>
                      {m.sources && m.sources.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-sky-400">{m.sources.length} Search Citations</span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap font-sans">{m.content}</div>

                  {/* Grounding Citations */}
                  {m.sources && m.sources.length > 0 && (
                    <div className="pt-2 border-t border-slate-850 space-y-1">
                      <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1 font-bold">
                        <Globe className="w-3 h-3 text-sky-400" />
                        <span>Google Search Grounding Sources:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.sources.slice(0, 4).map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-300 hover:text-sky-200 hover:border-sky-500 flex items-center gap-1 transition-colors"
                          >
                            <span className="truncate max-w-[140px]">{src.title}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-slate-500 text-right">
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="font-mono">
                  {useSearchGrounding ? 'Querying Google Search & analyzing forensic data...' : 'Generating specialist response...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-850 bg-slate-950 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] font-mono">
          <span className="text-slate-500 whitespace-nowrap">Suggested:</span>
          {[
            'Audit our deepfake detection pipeline for false positives',
            'Search latest 2026 ransomware IoCs & Cobalt Strike signatures',
            'How should we defend class imbalance to the jury?',
            'Explain RFC 3227 Order of Volatility in forensic triage'
          ].map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar with Transcription Microphone */}
        <div className="p-4 border-t border-slate-800 bg-[#0a0d16] flex items-center gap-2">
          
          {/* Audio Transcription Button (gemini-3.5-transcribe) */}
          <button
            onClick={handleToggleRecordAudio}
            disabled={isTranscribing}
            className={`p-3 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
              isRecording
                ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse'
                : isTranscribing
                ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-emerald-400 hover:border-slate-700'
            }`}
            title={
              isRecording
                ? 'Stop recording and transcribe audio (gemini-3.5-transcribe)'
                : 'Click to record microphone voice input'
            }
          >
            {isTranscribing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                isRecording
                  ? 'Listening to microphone... Click mic icon again to transcribe.'
                  : isTranscribing
                  ? 'Transcribing audio using gemini-3.5-transcribe...'
                  : 'Ask forensic question, request jury mock drill, or search live threat data...'
              }
              className="w-full px-4 py-3 text-xs sm:text-sm text-white bg-slate-900 border border-slate-800 rounded-xl placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="p-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold transition-colors shrink-0"
            title="Send Message (Enter)"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
