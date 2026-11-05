import React, { useState } from 'react';
import { JudgeQuestion } from '../types';
import { presentationPitchTips, judgingRubricCriteria } from '../data/judgeQuestions';
import { Brain, Sparkles, AlertCircle, CheckCircle2, ChevronRight, MessageSquare, Award, ArrowRight, ArrowLeft, Lightbulb, ShieldAlert, Target } from 'lucide-react';

interface JudgeVivaSectionProps {
  questions: JudgeQuestion[];
}

export const JudgeVivaSection: React.FC<JudgeVivaSectionProps> = ({ questions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeQuestionId, setActiveQuestionId] = useState<string>(questions[0].id);
  const [isFlashcardMode, setIsFlashcardMode] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState<boolean>(false);

  const categories = ['All', 'Problem & Value', 'Technical Architecture', 'AI & Accuracy', 'Security & Defense', 'Feasibility & Roadmaps'];

  const filteredQuestions = questions.filter((q) => {
    return selectedCategory === 'All' || q.category === selectedCategory;
  });

  const activeQuestion = questions.find((q) => q.id === activeQuestionId) || questions[0];

  const handleNextFlashcard = () => {
    setShowFlashcardAnswer(false);
    setFlashcardIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrevFlashcard = () => {
    setShowFlashcardAnswer(false);
    setFlashcardIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  return (
    <div className="py-8 space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <Brain className="w-4 h-4" />
            <span>Viva Preparation & Jury Cross-Examination</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hackathon Judge Defense Kit
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Sample responses, architecture defense scripts, model accuracy explanations, and presentation frameworks designed to ace technical judging panels.
          </p>
        </div>

        {/* Flashcard Mode Toggle */}
        <button
          onClick={() => {
            setIsFlashcardMode(!isFlashcardMode);
            setShowFlashcardAnswer(false);
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 shrink-0 ${
            isFlashcardMode
              ? 'bg-emerald-400 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isFlashcardMode ? 'Exit Practice Flashcards' : 'Launch Viva Flashcard Drill'}</span>
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* FLASHCARD INTERACTIVE REHEARSAL DRILL MODE */}
      {/* ---------------------------------------------------- */}
      {isFlashcardMode ? (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center font-mono text-xs text-slate-400">
            FLASHCARD DRILL: QUESTION #{flashcardIndex + 1} OF {questions.length}
          </div>

          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl min-h-[360px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-bold">{questions[flashcardIndex].category}</span>
                <span>Judge Cross-Examination</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                "{questions[flashcardIndex].question}"
              </h3>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
                <strong className="text-amber-400">Why Judges Ask This:</strong> {questions[flashcardIndex].whyJudgesAsk}
              </div>

              {showFlashcardAnswer && (
                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-100 space-y-3">
                  <div className="font-mono text-emerald-400 font-bold uppercase text-[11px]">
                    Recommended Defense Formulation:
                  </div>
                  <p className="leading-relaxed text-sm">
                    {questions[flashcardIndex].sampleAnswer}
                  </p>
                  <div className="pt-2 border-t border-emerald-500/20 text-xs text-slate-300">
                    <strong className="text-rose-400">Pitfall to Avoid:</strong> {questions[flashcardIndex].commonPitfalls}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-850 flex items-center justify-between gap-4">
              <button
                onClick={handlePrevFlashcard}
                className="px-4 py-2 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-850 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev Question</span>
              </button>

              <button
                onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                className="px-5 py-2.5 text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                {showFlashcardAnswer ? 'Hide Sample Defense' : 'Reveal Sample Defense'}
              </button>

              <button
                onClick={handleNextFlashcard}
                className="px-4 py-2 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-850 flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ---------------------------------------------------- */
        /* STANDARD VIVA DEFENSE QUESTIONS BROWSER */
        /* ---------------------------------------------------- */
        <div className="space-y-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2-Column Interface: Left Questions List + Right Detailed Answer & Defense Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Question List (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredQuestions.map((q, idx) => {
                const isActive = q.id === activeQuestionId;
                return (
                  <div
                    key={q.id}
                    onClick={() => setActiveQuestionId(q.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span className="text-emerald-400 font-bold">VIVA PROMPT #{idx + 1}</span>
                      <span className="text-slate-400">{q.category}</span>
                    </div>
                    <h3 className={`text-xs font-bold leading-relaxed ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {q.question}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Sample Defense (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800 p-6 sm:p-8 space-y-6">
              
              {/* Question Header */}
              <div className="space-y-2 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="font-bold">{activeQuestion.category}</span>
                  <span>·</span>
                  <span>Judge Cross-Examination Defense</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  "{activeQuestion.question}"
                </h3>
              </div>

              {/* Why Judges Ask This */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
                  <Target className="w-3.5 h-3.5" />
                  <span>Jury Intent & Evaluation Objective</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeQuestion.whyJudgesAsk}
                </p>
              </div>

              {/* Key Bullet Points to Hit */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Key Verification Checkpoints to Cover in Your Pitch
                </h4>
                <div className="space-y-1.5">
                  {activeQuestion.keyPoints.map((pt: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Professional Answer */}
              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Sample Production-Grade Response</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans italic">
                  "{activeQuestion.sampleAnswer}"
                </p>
              </div>

              {/* Common Pitfalls to Avoid */}
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Common Pitch Trap to Avoid</span>
                </div>
                <p className="text-xs text-rose-200 leading-relaxed">
                  {activeQuestion.commonPitfalls}
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* JUDGING RUBRIC & PRESENTATION STRATEGY STRIP */}
      {/* ---------------------------------------------------- */}
      <div className="pt-8 border-t border-slate-800 space-y-8">
        
        {/* Judging Rubric Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <Award className="w-4 h-4" />
            <span>Collegiate Crimeathon Evaluation Rubric</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            How Hackathon Judges Score Your Project
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {judgingRubricCriteria.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-emerald-400">{item.weight}</span>
                  <span className="text-slate-500">Criteria #{idx + 1}</span>
                </div>
                <div className="text-sm font-bold text-white">{item.criterion}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Golden Presentation Tips */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-sky-400" />
            <span>5 Pitch Presentation Rules to Win Judge Favor</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {presentationPitchTips.map((tip, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                  <span className="text-emerald-400">0{idx + 1}.</span>
                  <span>{tip.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
