import React, { useState } from 'react';
import { CaseStudy } from '../types';
import { Shield, Search, FileText, CheckCircle2, AlertTriangle, Terminal, ChevronDown, ChevronRight, Lock, Eye, EyeOff, Sparkles, Database } from 'lucide-react';
import labImage from '../assets/images/case_study_forensic_lab_1793903156711.jpg';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  completedCaseIds: string[];
  onToggleCompleteCase: (id: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies,
  completedCaseIds,
  onToggleCompleteCase
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(caseStudies[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const filteredCases = caseStudies.filter((c) => {
    return (
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.threatType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.background.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const activeCase = caseStudies.find((c) => c.id === selectedCaseId) || caseStudies[0];
  const isCaseCompleted = completedCaseIds.includes(activeCase.id);

  const toggleSolution = (qId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleHint = (qId: string) => {
    setRevealedHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <Shield className="w-4 h-4" />
            <span>Forensic Simulation Dossiers · 10 Field Incidents</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Crime Investigation Case Studies
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Hands-on incident triage scenarios with authentic hex dumps, network logs, and transaction graphs. Solve the investigative puzzles and verify evidence against legal standards.
          </p>
        </div>

        {/* Progress tracker */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Dossiers Solved</div>
            <div className="text-base font-bold text-emerald-400 font-mono">
              {completedCaseIds.length} / {caseStudies.length} Cases
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
            {Math.round((completedCaseIds.length / caseStudies.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Mandatory Simulation Warning Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-mono font-bold uppercase tracking-wider">Educational Simulation Notice:</span>
          <p className="text-amber-300/90 leading-relaxed">
            All incident dossiers, suspect names, IP addresses, bank account numbers, and device serial numbers depicted below are fictional pedagogical simulations designed exclusively for hackathon preparation and university forensic training.
          </p>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Case Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies (e.g. SIM Swap, Ransomware)..."
              className="w-full pl-9 pr-4 py-2 text-xs text-white bg-slate-950 border border-slate-800 rounded-lg placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* List of Cases */}
          <div className="space-y-2 max-h-[800px] overflow-y-auto pr-1">
            {filteredCases.map((c) => {
              const isActive = c.id === selectedCaseId;
              const isDone = completedCaseIds.includes(c.id);

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="text-emerald-400 font-bold">{c.caseCode}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[10px]">{c.difficulty}</span>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                  </div>

                  <h3 className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {c.title}
                  </h3>

                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {c.threatType}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Forensic Lab Visual Widget */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 hidden lg:block">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={labImage}
                alt="Cyber Forensic Station"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
            <div className="p-3 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="text-emerald-400 font-bold">DIGITAL FORENSIC WORKBENCH</div>
              <p className="text-slate-500 text-[10px]">
                Hardware write-blockers, memory triage dumps, and cryptographic chain-of-custody protocols.
              </p>
            </div>
          </div>

        </div>

        {/* Right Active Case Study Dossier (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/80 rounded-xl border border-slate-800 p-6 sm:p-8 space-y-6">
          
          {/* Header & Status Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-bold">{activeCase.caseCode}</span>
                <span>·</span>
                <span>{activeCase.threatType}</span>
                <span>·</span>
                <span className="text-slate-300">{activeCase.difficulty}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeCase.title}
              </h3>
            </div>

            <button
              onClick={() => onToggleCompleteCase(activeCase.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 shrink-0 ${
                isCaseCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCaseCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{isCaseCompleted ? 'Dossier Solved & Closed' : 'Mark Case Solved'}</span>
            </button>
          </div>

          {/* 1. Case Background & Incident Dossier */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Incident Background</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeCase.background}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Investigative Triage Summary</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {activeCase.incidentDossier}
              </p>
            </div>
          </div>

          {/* 2. Evidence Locker (Provided Evidence Artifacts) */}
          <div className="space-y-3 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evidence Locker ({activeCase.evidenceProvided.length} Artifacts Seized)</span>
            </h4>

            <div className="space-y-3">
              {activeCase.evidenceProvided.map((ev) => (
                <div key={ev.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white">{ev.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                      {ev.type}
                    </span>
                  </div>

                  <pre className="p-3 rounded-lg bg-black/60 border border-slate-800/80 text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {ev.snippet}
                  </pre>

                  <p className="text-[11px] text-slate-400 font-mono">
                    Forensic Significance: {ev.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Investigation Objectives */}
          <div className="space-y-2 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Investigation Mandate & Objectives</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {activeCase.investigationObjectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
                  <span className="text-blue-400 font-mono font-bold">0{idx + 1}.</span>
                  <span className="leading-snug">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Investigation Questions to Solve */}
          <div className="space-y-3 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Investigative Challenge Questions</span>
            </h4>

            <div className="space-y-3">
              {activeCase.questionsToSolve.map((q, idx) => {
                const showSol = revealedSolutions[q.id];
                const showHnt = revealedHints[q.id];

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-semibold text-white leading-relaxed">
                        Q{idx + 1}: {q.question}
                      </span>
                    </div>

                    {/* Hint Button & Box */}
                    <div>
                      <button
                        onClick={() => toggleHint(q.id)}
                        className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        {showHnt ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{showHnt ? 'Hide Clue' : 'Reveal Forensic Clue / Hint'}</span>
                      </button>

                      {showHnt && (
                        <div className="mt-2 p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                          Hint: {q.hint}
                        </div>
                      )}
                    </div>

                    {/* Solution Button & Box */}
                    <div>
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        {showSol ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{showSol ? 'Hide Verified Solution' : 'View Verified Solution'}</span>
                      </button>

                      {showSol && (
                        <div className="mt-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                          <span className="font-mono font-bold text-emerald-400 block text-[10px] uppercase">
                            Forensic Finding & Solution:
                          </span>
                          <p className="leading-relaxed">{q.solution}</p>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Suggested Investigation Workflow */}
          <div className="space-y-3 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Recommended Standard Operating Procedure (SOP)</span>
            </h4>
            <div className="space-y-2.5">
              {activeCase.suggestedWorkflow.map((step) => (
                <div key={step.step} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-sky-400">Phase 0{step.step}: {step.title}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono text-slate-500">Recommended Tools:</span>
                    {step.recommendedTools.map((t, tidx) => (
                      <span key={tidx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Expected Final Forensic Conclusion */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Official Incident Conclusion & Judicial Resolution
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeCase.expectedSolution}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
