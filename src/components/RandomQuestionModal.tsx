import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Terminal, X, RotateCcw, Check, Bookmark, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface RandomQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onToggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const RandomQuestionModal: React.FC<RandomQuestionModalProps> = ({
  isOpen,
  onClose,
  questions,
  onToggleBookmark,
  isBookmarked
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const rollNewQuestion = () => {
    if (questions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    if (isOpen) {
      rollNewQuestion();
    }
  }, [isOpen]);

  if (!isOpen || !currentQuestion) return null;

  const hasAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  const bookmarked = isBookmarked(currentQuestion.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
            <Terminal className="w-4 h-4" />
            <span>DAILY WARM-UP DRILL</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(currentQuestion.id)}
              className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-900"
              title="Bookmark Question"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Metadata */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-emerald-400 font-bold">{currentQuestion.category}</span>
          <span>·</span>
          <span>{currentQuestion.difficulty} Difficulty</span>
        </div>

        {/* Question text */}
        <h3 className="text-base font-semibold text-white leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((opt, optIdx) => {
            const isThisChosen = selectedOption === optIdx;
            const isThisCorrect = optIdx === currentQuestion.correctAnswer;

            let btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700';

            if (hasAnswered) {
              if (isThisChosen && isCorrect) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-100 font-medium';
              } else if (isThisChosen && !isCorrect) {
                btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-100 font-medium';
              } else if (isThisCorrect) {
                btnStyle = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={hasAnswered}
                onClick={() => {
                  setSelectedOption(optIdx);
                  setShowExplanation(true);
                }}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-mono font-bold shrink-0 bg-slate-800 border border-slate-700 mt-0.5">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="leading-relaxed flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="font-mono text-emerald-400 font-bold text-[11px] flex items-center justify-between">
              <span>ANSWER: OPTION {String.fromCharCode(65 + currentQuestion.correctAnswer)}</span>
              <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-mono text-slate-400 hover:text-white"
          >
            Close
          </button>

          <button
            onClick={rollNewQuestion}
            className="px-4 py-2 rounded-lg text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Roll Another Question</span>
          </button>
        </div>

      </div>
    </div>
  );
};
