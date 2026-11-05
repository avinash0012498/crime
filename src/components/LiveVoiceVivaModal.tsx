import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Mic, MicOff, X, Volume2, ShieldCheck, AlertCircle, PhoneOff, Radio } from 'lucide-react';

interface LiveVoiceVivaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveVoiceVivaModal: React.FC<LiveVoiceVivaModalProps> = ({ isOpen, onClose }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('Click Connect to begin live oral viva cross-examination.');
  const [isModelSpeaking, setIsModelSpeaking] = useState<boolean>(false);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scheduledTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      stopLiveSession();
    };
  }, []);

  if (!isOpen) return null;

  // Converts Float32Array to 16-bit PCM ArrayBuffer
  const floatTo16BitPCM = (float32Array: Float32Array): ArrayBuffer => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
  };

  // Convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const startLiveSession = async () => {
    try {
      setStatusText('Connecting to Gemini 3.8 Live API...');
      
      // Setup output AudioContext at 24kHz for Live API model playback
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      outputAudioCtxRef.current = outputCtx;
      scheduledTimeRef.current = outputCtx.currentTime;

      // Connect WebSocket to server Live API bridge
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${protocol}//${window.location.host}/live`);
      wsRef.current = ws;

      ws.onopen = async () => {
        setIsConnected(true);
        setStatusText('Live session connected. Initializing 16kHz microphone stream...');

        // Setup input AudioContext at 16kHz for Live API microphone ingestion
        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 16000,
        });
        inputAudioCtxRef.current = inputCtx;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            sampleRate: 16000,
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
        mediaStreamRef.current = stream;

        const source = inputCtx.createMediaStreamSource(stream);
        // ScriptProcessor captures raw PCM chunks
        const processor = inputCtx.createScriptProcessor(2048, 1, 1);

        processor.onaudioprocess = (e) => {
          if (isMuted || ws.readyState !== WebSocket.OPEN) return;
          const inputData = e.inputBuffer.getChannelData(0);
          const pcmBuffer = floatTo16BitPCM(inputData);
          const base64Audio = arrayBufferToBase64(pcmBuffer);

          ws.send(JSON.stringify({ audio: base64Audio }));
        };

        source.connect(processor);
        processor.connect(inputCtx.destination);

        setStatusText('AI Judge is listening. Introduce your Crimeathon project or answer the opening question.');
      };

      ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.interrupted) {
            // Cut off pending playback if user interrupted
            setIsModelSpeaking(false);
            if (outputAudioCtxRef.current) {
              scheduledTimeRef.current = outputAudioCtxRef.current.currentTime;
            }
          }

          if (data.audio && outputAudioCtxRef.current) {
            setIsModelSpeaking(true);
            const binaryString = window.atob(data.audio);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }

            // Convert 16-bit little endian PCM to Float32
            const pcm16 = new Int16Array(bytes.buffer);
            const float32 = new Float32Array(pcm16.length);
            for (let i = 0; i < pcm16.length; i++) {
              float32[i] = pcm16[i] / 32768.0;
            }

            const audioBuffer = outputAudioCtxRef.current.createBuffer(
              1,
              float32.length,
              24000
            );
            audioBuffer.getChannelData(0).set(float32);

            const source = outputAudioCtxRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioCtxRef.current.destination);

            const startTime = Math.max(
              outputAudioCtxRef.current.currentTime,
              scheduledTimeRef.current
            );
            source.start(startTime);
            scheduledTimeRef.current = startTime + audioBuffer.duration;

            source.onended = () => {
              if (outputAudioCtxRef.current && outputAudioCtxRef.current.currentTime >= scheduledTimeRef.current) {
                setIsModelSpeaking(false);
              }
            };
          }

          if (data.error) {
            setStatusText(`Notice: ${data.error}`);
          }
        } catch (e) {
          console.error('[Live API] Failed to parse message:', e);
        }
      };

      ws.onerror = (err) => {
        console.error('[Live API] WebSocket error:', err);
        setStatusText('Live WebSocket connection encountered an error.');
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsModelSpeaking(false);
        setStatusText('Live viva session ended.');
      };
    } catch (err: any) {
      console.error('Failed to start Live API session:', err);
      setStatusText(`Connection failed: ${err.message || 'Microphone error'}`);
      stopLiveSession();
    }
  };

  const stopLiveSession = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    setIsConnected(false);
    setIsModelSpeaking(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            stopLiveSession();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Gemini 3.8 Live API</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Live AI Oral Viva Cross-Examination
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Practice real-time spoken Q&A with an AI Hackathon Judge. Low-latency, bidirectional voice conversation powered by <code className="text-emerald-400 font-mono">gemini-3.8-live</code>.
          </p>
        </div>

        {/* Pulsing Visualizer Circle */}
        <div className="relative py-8 flex items-center justify-center">
          {/* Animated Glow Rings */}
          <div
            className={`absolute w-44 h-44 rounded-full transition-all duration-700 pointer-events-none ${
              isModelSpeaking
                ? 'bg-emerald-500/20 scale-125 animate-ping'
                : isConnected
                ? 'bg-sky-500/10 scale-110 animate-pulse'
                : 'bg-slate-800/10'
            }`}
          />

          <div
            className={`w-36 h-36 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl relative z-10 ${
              isModelSpeaking
                ? 'border-emerald-400 bg-emerald-950/40 shadow-emerald-500/30'
                : isConnected
                ? 'border-sky-400 bg-sky-950/30 shadow-sky-500/20'
                : 'border-slate-800 bg-slate-900/60'
            }`}
          >
            {isModelSpeaking ? (
              <Volume2 className="w-12 h-12 text-emerald-400 animate-bounce" />
            ) : isConnected ? (
              <Mic className="w-12 h-12 text-sky-400" />
            ) : (
              <Radio className="w-12 h-12 text-slate-600" />
            )}

            <span className="text-[10px] font-mono mt-2 uppercase tracking-wider text-slate-300 font-bold">
              {isModelSpeaking ? 'Judge Speaking' : isConnected ? 'Listening...' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Status Text Box */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 min-h-[48px] flex items-center justify-center">
          {statusText}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {!isConnected ? (
            <button
              onClick={startLiveSession}
              className="px-6 py-3.5 rounded-xl text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Radio className="w-4 h-4" />
              <span>Connect Live Voice Viva</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                  isMuted
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4 text-amber-400" /> : <Mic className="w-4 h-4" />}
                <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
              </button>

              <button
                onClick={stopLiveSession}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center gap-1.5 shadow-lg shadow-rose-600/20"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Viva Session</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
