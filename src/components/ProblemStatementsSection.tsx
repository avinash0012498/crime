import React, { useState } from 'react';
import { ProblemStatement, DifficultyLevel } from '../types';
import { Compass, Search, Filter, CheckCircle2, ChevronRight, Cpu, Layers, Target, AlertTriangle, FileCheck, Code2, Sparkles, Bookmark } from 'lucide-react';
import predictionNodeImage from '../assets/images/ai_crime_prediction_node_1793903156974.jpg';

interface ProblemStatementsSectionProps {
  problems: ProblemStatement[];
  completedProblemIds: string[];
  onToggleComplete: (id: string) => void;
  selectedProblemId?: string | null;
  onSelectProblem?: (id: string | null) => void;
}

export const ProblemStatementsSection: React.FC<ProblemStatementsSectionProps> = ({
  problems,
  completedProblemIds,
  onToggleComplete,
  selectedProblemId,
  onSelectProblem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeTabId, setActiveTabId] = useState<string>(selectedProblemId || problems[0].id);

  // Sync active tab if parent passed one
  React.useEffect(() => {
    if (selectedProblemId) {
      setActiveTabId(selectedProblemId);
    }
  }, [selectedProblemId]);

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const activeProblem = problems.find((p) => p.id === activeTabId) || problems[0];
  const isCompleted = completedProblemIds.includes(activeProblem.id);

  return (
    <div className="py-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Problem Statements · 10 Official Tracks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hackathon Challenge Blueprints
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Detailed investigation scenarios, technical architectures, recommended stack components, and jury evaluation criteria for all ten Crimeathon tracks.
          </p>
        </div>

        {/* Progress Tracker Pill */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Prepared Tracks</div>
            <div className="text-base font-bold text-emerald-400 font-mono">
              {completedProblemIds.length} / {problems.length} Completed
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
            {Math.round((completedProblemIds.length / problems.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by keyword (e.g. YOLO, PyTorch, Deepfake, Graph, Forensics)..."
            className="w-full pl-9 pr-4 py-2 text-xs text-white bg-slate-900/90 border border-slate-800 rounded-lg placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-md font-mono transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-emerald-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Interface: Left Track Selector + Right Deep Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Track Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[850px] overflow-y-auto pr-1">
          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
              No problem statements match your search criteria.
            </div>
          ) : (
            filteredProblems.map((p) => {
              const active = p.id === activeTabId;
              const finished = completedProblemIds.includes(p.id);

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveTabId(p.id);
                    if (onSelectProblem) onSelectProblem(p.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    active
                      ? 'bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="text-emerald-400 font-bold">TRACK #0{p.number}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        p.difficulty === 'Advanced' ? 'text-rose-400 bg-rose-500/10' :
                        p.difficulty === 'Intermediate' ? 'text-amber-400 bg-amber-500/10' :
                        'text-emerald-400 bg-emerald-500/10'
                      }`}>
                        {p.difficulty}
                      </span>
                      {finished && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  <h3 className={`text-xs font-bold leading-tight ${active ? 'text-white' : 'text-slate-300'}`}>
                    {p.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {p.shortSummary}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Comprehensive Problem Dossier (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/80 rounded-xl border border-slate-800 p-6 sm:p-8 space-y-6">
          
          {/* Header & Prepared Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-bold">CHALLENGE STATEMENT #0{activeProblem.number}</span>
                <span>·</span>
                <span>{activeProblem.domain}</span>
                <span>·</span>
                <span className="text-slate-300">{activeProblem.difficulty} Difficulty</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeProblem.title}
              </h3>
            </div>

            <button
              onClick={() => onToggleComplete(activeProblem.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 shrink-0 ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{isCompleted ? 'Track Prepared & Reviewed' : 'Mark as Prepared'}</span>
            </button>
          </div>

          {/* 1. Problem Description & Real-World Scenario */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Problem Statement Overview</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProblem.description}
              </p>
            </div>

            {/* Real-world Scenario Callout Box */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Real-World Field Incident Context</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{activeProblem.realWorldScenario}"
              </p>
            </div>

            {/* Why It Matters */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Why This Problem Matters
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeProblem.whyItMatters}
              </p>
            </div>
          </div>

          {/* 2. Proposed Technical Approach & Architecture */}
          <div className="space-y-3 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Recommended Technical Architecture & Pipeline</span>
            </h4>
            <div className="space-y-2">
              {activeProblem.proposedTechnicalApproach.map((step, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300"
                >
                  <span className="font-mono font-bold text-sky-400 text-[11px] shrink-0 mt-0.5">
                    Step {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Recommended Technologies Stack */}
          <div className="space-y-2.5 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Recommended Technologies & Libraries</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeProblem.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Expected Deliverable & Outcome */}
          <div className="space-y-2 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Expected MVP Hackathon Outcome</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20">
              {activeProblem.expectedOutcome}
            </p>
          </div>

          {/* 5. Participant Preparation Prompts & Technical Viva Questions */}
          <div className="space-y-3 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Participant Preparation Prompts & Jury Questions</span>
            </h4>
            <div className="space-y-2">
              {activeProblem.participantQuestions.map((q, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1"
                >
                  <div className="font-mono text-emerald-400 font-semibold text-[11px]">
                    Technical Prompt #{idx + 1}
                  </div>
                  <p className="text-slate-200">{q}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Evaluation Criteria Checklist */}
          <div className="space-y-2 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Judge Evaluation Focus Areas</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              {activeProblem.evaluationCriteria.map((crit, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-900/40 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
