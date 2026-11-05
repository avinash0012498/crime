import React, { useState, useMemo } from 'react';
import { Question, QuestionCategory } from '../types';
import { Search, HelpCircle, Bookmark, Check, X, Eye, EyeOff, Sparkles, Filter, ChevronDown, CheckCircle2 } from 'lucide-react';

interface QuestionBankSectionProps {
  questions: Question[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onLaunchMockExamWithCategory?: (category: QuestionCategory) => void;
}

export const QuestionBankSection: React.FC<QuestionBankSectionProps> = ({
  questions,
  bookmarkedIds,
  onToggleBookmark,
  onLaunchMockExamWithCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [studyMode, setStudyMode] = useState<boolean>(false); // in study mode, answers are shown immediately

  const categories: QuestionCategory[] = [
    'Cybersecurity',
    'Artificial Intelligence and Machine Learning',
    'Digital Forensics',
    'Ethical Hacking',
    'OSINT',
    'Criminal Investigation',
    'Data Analysis',
    'Software Development',
    'Database Management',
    'General Hackathon Questions'
  ];

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchesBookmark = !showOnlyBookmarked || bookmarkedIds.includes(q.id);
      const matchesSearch =
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDifficulty && matchesBookmark && matchesSearch;
    });
  }, [questions, selectedCategory, selectedDifficulty, showOnlyBookmarked, searchQuery, bookmarkedIds]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setPracticeAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleExplanation = (questionId: string) => {
    setRevealedExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className="py-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Question Bank · {questions.length} Vetted Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Comprehensive Technical Question Bank
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Test yourself on cybersecurity, deep learning, forensics, network defense, database concurrency, and viva pitch strategy across 10 specialized hackathon tracks.
          </p>
        </div>

        {/* Study Mode vs Interactive Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setStudyMode(false)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
              !studyMode ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Practice Mode (Interactive)
          </button>
          <button
            onClick={() => setStudyMode(true)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
              studyMode ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Study Mode (Answers Revealed)
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 100 questions (e.g. SHA-256, MITRE, Volatility, RAG, PostGIS)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs text-white bg-slate-900 border border-slate-800 rounded-lg placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Bookmarked Filter Button */}
          <button
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-center gap-2 border transition-colors shrink-0 ${
              showOnlyBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Bookmarked ({bookmarkedIds.length})</span>
          </button>

          {/* Difficulty Dropdown / Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
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

        {/* Category Filter Pills (Interactive Segmented Bar) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Tracks ({questions.length})
          </button>
          {categories.map((cat) => {
            const count = questions.filter((q) => q.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

      </div>

      {/* Questions Counter & Category Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-mono gap-2">
        <span>Showing {filteredQuestions.length} of {questions.length} questions</span>
        {selectedCategory !== 'All' && onLaunchMockExamWithCategory && (
          <button
            onClick={() => onLaunchMockExamWithCategory(selectedCategory as QuestionCategory)}
            className="text-emerald-400 hover:text-emerald-300 underline font-semibold self-start sm:self-auto"
          >
            Launch Mock Exam for "{selectedCategory}" →
          </button>
        )}
      </div>

      {/* Question Cards Grid */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400 text-xs">
            No questions found matching your filter criteria. Try clearing your search or switching categories.
          </div>
        ) : (
          filteredQuestions.map((q, qIndex) => {
            const isBookmarked = bookmarkedIds.includes(q.id);
            const userChoice = practiceAnswers[q.id];
            const hasAnswered = userChoice !== undefined;
            const isCorrect = userChoice === q.correctAnswer;
            const showExplanation = studyMode || revealedExplanations[q.id] || hasAnswered;

            return (
              <div
                key={q.id}
                className="p-5 sm:p-6 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-4 hover:border-slate-700 transition-colors"
              >
                {/* Card Top: Metadata + Bookmark */}
                <div className="flex items-center justify-between gap-3 text-xs font-mono text-slate-400 border-b border-slate-850 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-emerald-400 font-bold">#{q.id.toUpperCase()}</span>
                    <span>·</span>
                    <span className="text-slate-300">{q.category}</span>
                    <span>·</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      q.difficulty === 'Hard' ? 'text-rose-400 bg-rose-500/10' :
                      q.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10' :
                      'text-emerald-400 bg-emerald-500/10'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(q.id)}
                    className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors rounded hover:bg-slate-900"
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Question Text */}
                <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                  {q.question}
                </h3>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-2.5">
                  {q.options.map((option, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    const isThisCorrect = optIdx === q.correctAnswer;

                    // Option styling logic depending on mode and selection
                    let optionClass = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700';

                    if (studyMode) {
                      if (isThisCorrect) {
                        optionClass = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 font-medium';
                      }
                    } else if (hasAnswered) {
                      if (isSelected && isCorrect) {
                        optionClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-100 font-medium';
                      } else if (isSelected && !isCorrect) {
                        optionClass = 'bg-rose-500/20 border-rose-500 text-rose-100 font-medium';
                      } else if (isThisCorrect) {
                        optionClass = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={studyMode}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionClass}`}
                      >
                        <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-mono font-bold shrink-0 bg-slate-800/80 border border-slate-700/60 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug flex-1">{option}</span>
                        
                        {/* Status icon if answered */}
                        {hasAnswered && isThisCorrect && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {hasAnswered && isSelected && !isCorrect && (
                          <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Reveal Accordion */}
                <div className="pt-2">
                  {!studyMode && !hasAnswered && (
                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="text-xs font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                    >
                      {revealedExplanations[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{revealedExplanations[q.id] ? 'Hide Answer & Explanation' : 'Peek Answer & Explanation'}</span>
                    </button>
                  )}

                  {showExplanation && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
                        <span>CORRECT ANSWER: OPTION {String.fromCharCode(65 + q.correctAnswer)}</span>
                        {hasAnswered && (
                          <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                            {isCorrect ? '✓ Verified Correct' : '✗ Incorrect Attempt'}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                        {q.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
