import React, { useState, useEffect } from 'react';
import { Search, X, Terminal, Compass, HelpCircle, Shield, Brain, BookOpen, ArrowRight } from 'lucide-react';
import { ProblemStatement, Question, CaseStudy, LearningResource, JudgeQuestion } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  problemStatements: ProblemStatement[];
  questions: Question[];
  caseStudies: CaseStudy[];
  learningResources: LearningResource[];
  judgeQuestions: JudgeQuestion[];
  onSelectResult: (type: 'problem' | 'question' | 'case' | 'viva' | 'resource', id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  problemStatements,
  questions,
  caseStudies,
  learningResources,
  judgeQuestions,
  onSelectResult
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = searchTerm.toLowerCase().trim();

  // Results grouping
  const matchedProblems = q
    ? problemStatements.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.domain.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const matchedQuestions = q
    ? questions.filter(
        (qst) =>
          qst.question.toLowerCase().includes(q) ||
          qst.category.toLowerCase().includes(q) ||
          qst.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchedCases = q
    ? caseStudies.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.threatType.toLowerCase().includes(q) ||
          c.caseCode.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedViva = q
    ? judgeQuestions.filter(
        (v) =>
          v.question.toLowerCase().includes(q) ||
          v.sampleAnswer.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedResources = q
    ? learningResources.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const totalResults =
    matchedProblems.length +
    matchedQuestions.length +
    matchedCases.length +
    matchedViva.length +
    matchedResources.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="max-w-2xl w-full bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden space-y-0">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/80">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search challenges, questions, case logs, viva defenses, or tools..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[500px] overflow-y-auto p-4 space-y-5">
          {!searchTerm ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500 space-y-2">
              <p>Type keywords to search across the entire Crimeathon hub.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Deepfake', 'SIM Swap', 'YOLO', 'Volatility', 'RAG', 'PostGIS', 'Chain of Custody'].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setSearchTerm(sug)}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 text-[11px]"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              No results found for "{searchTerm}".
            </div>
          ) : (
            <>
              {/* Problem Statements */}
              {matchedProblems.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Challenge Blueprints</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedProblems.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectResult('problem', p.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <div className="font-bold text-white">{p.title}</div>
                          <div className="text-[11px] text-slate-400">{p.domain}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies */}
              {matchedCases.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-sky-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Forensic Case Studies</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCases.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onSelectResult('case', c.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900 hover:border-sky-500/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <div className="font-bold text-white">{c.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{c.caseCode} · {c.threatType}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions */}
              {matchedQuestions.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Question Bank</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedQuestions.map((qst) => (
                      <div
                        key={qst.id}
                        onClick={() => {
                          onSelectResult('question', qst.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900 hover:border-amber-500/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div className="pr-3">
                          <div className="font-medium text-slate-200 line-clamp-1">{qst.question}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{qst.category} · {qst.difficulty}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Viva Defense */}
              {matchedViva.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-rose-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5" />
                    <span>Judge Defense Questions</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedViva.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => {
                          onSelectResult('viva', v.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900 hover:border-rose-500/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <div className="font-bold text-white">"{v.question}"</div>
                          <div className="text-[11px] text-slate-400 font-mono">{v.category}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 px-4">
          <span>Search index: 10 Tracks · 100 Qs · 10 Cases</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  );
};
