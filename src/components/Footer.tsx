import React from 'react';
import { Shield, Lock, Terminal, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#06080d] text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white uppercase font-mono tracking-wider text-sm">
                CRIMEATHON
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              AI-Powered Crime Investigation & Hackathon Preparation Hub. Built for collegiate students and engineering teams tackling cutting-edge crime tech challenges.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% LocalStorage · No External Tracking</span>
            </div>
          </div>

          {/* Col 2: Core Modules */}
          <div>
            <h4 className="font-semibold text-white uppercase font-mono text-xs tracking-wider mb-3">
              Preparation Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('challenges')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  10 Hackathon Challenges
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('questions')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  100+ Question Bank
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('mocktest')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Timed Mock Exam System
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('cases')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  10 Forensic Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('viva')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Judge Questions & Viva Prep
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Competencies & Tech */}
          <div>
            <h4 className="font-semibold text-white uppercase font-mono text-xs tracking-wider mb-3">
              Domains Covered
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Digital Forensics & Evidence</li>
              <li>Spatiotemporal AI & Anomaly ML</li>
              <li>Ethical Hacking & Network Defense</li>
              <li>OSINT & Social Network Graphing</li>
              <li>FinTech Fraud & Crypto Laundering</li>
              <li>Deepfake & Synthetic Media Audio</li>
            </ul>
          </div>

          {/* Col 4: Ethical & Legal Notice */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase font-mono text-xs tracking-wider mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ethical Notice</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              All investigation cases, sample dossiers, and datasets on this platform are simulated scenarios designed strictly for collegiate hackathons, academic learning, and authorized forensic training.
            </p>
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 font-mono">
              <span>Rule of Law: Always obtain written authorization before conducting technical audits.</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© 2026 CRIMEATHON Innovation Hub. Built for Hackathon Champions.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Offline-Ready</span>
            <span>·</span>
            <span>Deployable via GitHub Pages</span>
            <span>·</span>
            <span>No API Keys Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
