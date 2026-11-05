import React from 'react';
import { Shield, Award, Terminal, ArrowRight, Brain, Search, HelpCircle, CheckCircle, FileText, Database, Lock } from 'lucide-react';
import heroImage from '../assets/images/hero_crimeathon_cyber_1793903156905.jpg';
import { ProblemStatement } from '../types';

interface HeroProps {
  onExploreChallenges: () => void;
  onStartPracticing: () => void;
  onSelectProblem: (id: string) => void;
  problemStatements: ProblemStatement[];
}

export const Hero: React.FC<HeroProps> = ({
  onExploreChallenges,
  onStartPracticing,
  onSelectProblem,
  problemStatements
}) => {
  const featuredChallenges = problemStatements.slice(0, 3);

  const stats = [
    { label: 'Problem Statements', value: '10', detail: 'Real-world incident blueprints' },
    { label: 'Vetted Question Bank', value: '100+', detail: '10 Technical domains' },
    { label: 'Forensic Case Studies', value: '10', detail: 'Full simulation dossiers' },
    { label: 'Judge Defense Kit', value: '11', detail: 'Viva rubrics & sample answers' }
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column Hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Kicker - unboxed text metadata */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>Next-Gen Hackathon Preparation Hub</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">v2.4 Cyber Intelligence</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              THINK LIKE AN INVESTIGATOR.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500">
                BUILD LIKE AN INNOVATOR.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              The definitive preparation platform for student engineers participating in Crimeathon competitions. Master real-world digital crime problem statements, solve hands-on forensic case simulations, test your knowledge in timed exam rounds, and ace technical judge viva cross-examinations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartPracticing}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 font-mono whitespace-nowrap"
              >
                <Award className="w-4 h-4 text-slate-950" />
                <span>Start Practising</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onExploreChallenges}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 rounded-lg transition-all flex items-center gap-2 font-mono whitespace-nowrap"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Explore Challenges</span>
              </button>
            </div>

            {/* Trust Badges / Quick Highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Client-Side LocalStorage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>Instant Offline-Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>GitHub Pages Deployable</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Cyber Investigation Terminal (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-2xl group">
              
              {/* Image Frame with Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={heroImage}
                  alt="CRIMEATHON Digital Investigation Center"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/30" />
                
                {/* HUD Overlay Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                    STATUS: READY FOR EVALUATION
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>10 Challenge Statements Active</span>
                  </div>
                  <span className="text-slate-400">Zero Cloud Dependency</span>
                </div>
              </div>

              {/* Terminal Quick Triage Strip */}
              <div className="p-4 border-t border-slate-800/80 bg-[#0a0e18] space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>INVESTIGATION DOMAINS</span>
                  <span className="text-emerald-400">10 / 10 LOADED</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800/60 text-slate-300">
                    <span className="text-emerald-400">▸</span> Deepfake & Media Audio
                  </div>
                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800/60 text-slate-300">
                    <span className="text-sky-400">▸</span> Spatial AI Hotspot Maps
                  </div>
                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800/60 text-slate-300">
                    <span className="text-blue-400">▸</span> Crypto Laundering Graph
                  </div>
                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800/60 text-slate-300">
                    <span className="text-amber-400">▸</span> Evidence Chain of Custody
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Real-world Statistics Strip (Row below Hero split) */}
        <div className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Problem Statements Quick Jump */}
        <div className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Featured Challenge Statements</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Selected high-impact problem briefs from the Crimeathon competition syllabus.
              </p>
            </div>
            <button
              onClick={onExploreChallenges}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View all 10 problem statements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredChallenges.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProblem(item.id)}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="text-emerald-400 font-bold">CHALLENGE #0{item.number}</span>
                    <span className="text-slate-400">{item.difficulty}</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {item.shortSummary}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="truncate max-w-[180px]">{item.domain}</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">
                    Inspect Blueprint →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
