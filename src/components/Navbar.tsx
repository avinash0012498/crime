import React, { useState } from 'react';
import {
  Shield,
  Search,
  Menu,
  X,
  Terminal,
  BookOpen,
  Brain,
  HelpCircle,
  Award,
  Compass,
  Sparkles,
  Bot,
  Radio,
  LogIn,
  LogOut,
  User as UserIcon,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenRandomQuestion: () => void;
  onOpenGeminiChat: () => void;
  onOpenLiveVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenSearch,
  onOpenRandomQuestion,
  onOpenGeminiChat,
  onOpenLiveVoice,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  const navLinks = [
    { id: 'home', label: 'Overview', icon: Terminal },
    { id: 'challenges', label: 'Challenges', icon: Compass },
    { id: 'questions', label: 'Question Bank', icon: HelpCircle },
    { id: 'mocktest', label: 'Mock Test', icon: Award },
    { id: 'cases', label: 'Case Studies', icon: Shield },
    { id: 'viva', label: 'Judge Prep', icon: Brain },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-wider text-white uppercase font-mono group-hover:text-emerald-400 transition-colors">
                  CRIMEATHON
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-0.5">
                  Investigation Hub
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Quick utilities */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* AI Copilot Button (Gemini Chatbot) */}
            <button
              onClick={onOpenGeminiChat}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 rounded-lg transition-colors"
              title="Open Gemini AI Forensic Copilot & Search Grounding"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* Live Voice Viva Button (Gemini 3.8 Live API) */}
            <button
              onClick={onOpenLiveVoice}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-sky-300 bg-sky-950/40 border border-sky-500/30 hover:bg-sky-900/50 rounded-lg transition-colors"
              title="Open Real-Time Live Voice Viva Interrogation"
            >
              <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="hidden md:inline">Voice Viva</span>
            </button>

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded-lg transition-colors focus:outline-none"
              title="Global Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Firebase Auth Google Sign-in / Profile */}
            {!loading && (
              user ? (
                <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-7 h-7 rounded-full border border-emerald-400/50"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono text-emerald-400 border border-slate-700">
                      {user.email ? user.email[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <button
                    onClick={signOut}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-900"
                    title="Sign Out of Cloud SQL sync"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded-lg transition-colors"
                  title="Sign in with Google to sync with Cloud SQL PostgreSQL"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sign In</span>
                </button>
              )
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('mocktest')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span>Mock Test</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-850 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-[#0a0d14] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                onOpenGeminiChat();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 text-xs font-mono font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-lg"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Copilot</span>
            </button>
            <button
              onClick={() => {
                onOpenLiveVoice();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 text-xs font-mono font-medium text-sky-300 bg-sky-950/40 border border-sky-500/30 rounded-lg"
            >
              <Radio className="w-3.5 h-3.5 text-sky-400" />
              <span>Voice Viva (Live)</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Sign In */}
          <div className="pt-2 border-t border-slate-850">
            {user ? (
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 px-2 py-1">
                <span>Signed in as {user.displayName || user.email}</span>
                <button
                  onClick={signOut}
                  className="text-rose-400 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono font-bold text-white bg-slate-900 border border-slate-800 rounded-lg"
              >
                <LogIn className="w-4 h-4 text-emerald-400" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
