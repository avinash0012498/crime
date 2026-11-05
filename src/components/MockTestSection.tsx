import React, { useState, useEffect, useRef } from 'react';
import { Question, TestResultHistory } from '../types';
import { Award, Clock, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, AlertTriangle, HelpCircle, Check, X, Bookmark, Flag, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MockTestSectionProps {
  questions: Question[];
  onSaveTestResult: (result: TestResultHistory) => void;
  presetCategory?: string | null;
}

type TestState = 'SETUP' | 'RUNNING' | 'FINISHED';

export const MockTestSection: React.FC<MockTestSectionProps> = ({
  questions,
  onSaveTestResult,
  presetCategory
}) => {
  const [testState, setTestState] = useState<TestState>('SETUP');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<string>(presetCategory || 'All');
  
  // Running state
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedIndices, setFlaggedIndices] = useState<Record<number, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(15 * 60); // in seconds
  const [initialDuration, setInitialDuration] = useState<number>(15 * 60);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Results state
  const [finalResult, setFinalResult] = useState<TestResultHistory | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'All' | 'Correct' | 'Incorrect' | 'Skipped'>('All');

  const timerRef = useRef<number | null>(null);

  // Sync if preset category passed
  useEffect(() => {
    if (presetCategory) {
      setSelectedCategory(presetCategory);
    }
  }, [presetCategory]);

  // Countdown timer effect
  useEffect(() => {
    if (testState === 'RUNNING' && !isTimerPaused && timeRemaining > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState, isTimerPaused, timeRemaining]);

  const handleStartExam = () => {
    // Filter questions by category if needed
    let pool = [...questions];
    if (selectedCategory !== 'All') {
      pool = pool.filter((q) => q.category === selectedCategory);
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    // Calculate time in seconds: 10Q -> 15m, 20Q -> 30m, 30Q -> 45m
    const duration = questionCount === 10 ? 15 * 60 : questionCount === 20 ? 30 * 60 : 45 * 60;

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedIndices({});
    setTimeRemaining(duration);
    setInitialDuration(duration);
    setIsTimerPaused(false);
    setShowConfirmSubmit(false);
    setTestState('RUNNING');
  };

  const handleAutoSubmit = () => {
    calculateAndFinishTest();
  };

  const handleManualSubmit = () => {
    setShowConfirmSubmit(true);
  };

  const calculateAndFinishTest = () => {
    let score = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};

    activeQuestions.forEach((q, idx) => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;

      const userChoice = selectedAnswers[idx];
      if (userChoice === q.correctAnswer) {
        score += 1;
        categoryBreakdown[q.category].correct += 1;
      }
    });

    const total = activeQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const timeSpent = initialDuration - timeRemaining;

    const resultRecord: TestResultHistory = {
      id: 'test-' + Date.now(),
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      totalQuestions: total,
      score,
      percentage,
      timeSpentSeconds: timeSpent,
      categoryBreakdown
    };

    setFinalResult(resultRecord);
    onSaveTestResult(resultRecord);
    setTestState('FINISHED');
    setShowConfirmSubmit(false);

    // Confetti if passed >= 70%
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback safe
      }
    }
  };

  const toggleFlag = (index: number) => {
    setFlaggedIndices((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------
  // 1. SETUP SCREEN
  // ----------------------------------------------------
  if (testState === 'SETUP') {
    return (
      <div className="py-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Timed Exam Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Crimeathon Mock Examination
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Replicate the pressure of competitive hackathon technical rounds. Strict countdown timer, no answer peeking during exam, and deep post-test category diagnostics.
          </p>
        </div>

        {/* Configuration Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-slate-950/80 border border-slate-800 space-y-8">
          
          {/* Question Count Selector: 10, 20, 30 */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Select Test Size Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { count: 10, label: 'Quick Sprint', time: '15 Minutes', desc: 'Rapid 10-question evaluation' },
                { count: 20, label: 'Standard Round', time: '30 Minutes', desc: 'Balanced 20-question comprehensive' },
                { count: 30, label: 'Championship Final', time: '45 Minutes', desc: 'Deep 30-question endurance drill' }
              ].map((tier) => (
                <button
                  key={tier.count}
                  onClick={() => setQuestionCount(tier.count)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    questionCount === tier.count
                      ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-1">
                    <span className="font-bold text-emerald-400">{tier.count} Questions</span>
                    <span className="text-slate-400">{tier.time}</span>
                  </div>
                  <div className="text-sm font-bold text-white">{tier.label}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{tier.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Scope Selection */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Exam Track Focus
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="All">All 10 Domains (Mixed General Hackathon Exam)</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Artificial Intelligence and Machine Learning">Artificial Intelligence & ML</option>
              <option value="Digital Forensics">Digital Forensics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="OSINT">OSINT</option>
              <option value="Criminal Investigation">Criminal Investigation & Law</option>
              <option value="Data Analysis">Data Analysis & Anomaly Detection</option>
              <option value="Software Development">Software Development & DevOps</option>
              <option value="Database Management">Database Management & PostGIS</option>
              <option value="General Hackathon Questions">General Hackathon & Viva Strategy</option>
            </select>
          </div>

          {/* Exam Instructions Banner */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="font-mono text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Examination Rules & Standards</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Answers and detailed forensic explanations are revealed strictly upon final submission.</li>
              <li>You may navigate back and forth, change answers, and flag questions for review at any time.</li>
              <li>When the timer expires, unsubmitted answers will automatically submit for grading.</li>
            </ul>
          </div>

          {/* Start CTA */}
          <button
            onClick={handleStartExam}
            className="w-full py-4 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all font-mono uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Begin Examination ({questionCount} Questions)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. LIVE EXAM INTERFACE
  // ----------------------------------------------------
  if (testState === 'RUNNING') {
    const currentQuestion = activeQuestions[currentIndex];
    const userSelected = selectedAnswers[currentIndex];
    const isFlagged = flaggedIndices[currentIndex] || false;
    const answeredCount = Object.keys(selectedAnswers).length;
    const progressPercent = Math.round(((currentIndex + 1) / activeQuestions.length) * 100);

    return (
      <div className="py-6 max-w-5xl mx-auto space-y-6">
        
        {/* Top Floating Telemetry Bar */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 sticky top-18 z-30 shadow-xl">
          {/* Question Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-slate-400">
              QUESTION <span className="text-white font-bold text-sm">#{currentIndex + 1}</span> of {activeQuestions.length}
            </span>
            <span className="text-slate-700">|</span>
            <span className="font-mono text-xs text-emerald-400">
              {answeredCount} Answered
            </span>
          </div>

          {/* Countdown Timer with urgency color */}
          <div className="flex items-center gap-2 font-mono">
            <Clock className={`w-4 h-4 ${timeRemaining < 180 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
            <span className={`text-base font-bold tabular-nums ${timeRemaining < 180 ? 'text-rose-400' : 'text-slate-100'}`}>
              {formatTimer(timeRemaining)}
            </span>
          </div>

          {/* Flag & Finish Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFlag(currentIndex)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-colors ${
                isFlagged 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
            </button>

            <button
              onClick={handleManualSubmit}
              className="px-4 py-1.5 text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-400 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Exam Grid: Left Question + Right Question Navigator Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Active Question Surface (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-xl bg-slate-950/80 border border-slate-800 space-y-6">
            
            {/* Meta tags */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-850 pb-3">
              <span className="text-emerald-400 font-bold">{currentQuestion.category}</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px]">
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = userSelected === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setSelectedAnswers((prev) => ({
                        ...prev,
                        [currentIndex]: optIdx
                      }));
                    }}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                      isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-slate-850 flex items-center justify-between gap-4">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-850 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {currentIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-lg text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-2"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleManualSubmit}
                  className="px-5 py-2.5 rounded-lg text-xs font-mono font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 flex items-center gap-2"
                >
                  <span>Review & Submit</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Right Question Palette (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold">
              Question Navigator
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-850">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-400"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-400"></span>
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-900 border border-slate-700"></span>
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-white"></span>
                <span>Current</span>
              </div>
            </div>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {activeQuestions.map((_, idx) => {
                const isAns = selectedAnswers[idx] !== undefined;
                const isFlg = flaggedIndices[idx] || false;
                const isCurr = currentIndex === idx;

                let btnClass = 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700';

                if (isFlg) {
                  btnClass = 'bg-amber-500/20 border-amber-400 text-amber-200';
                } else if (isAns) {
                  btnClass = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold';
                }

                if (isCurr) {
                  btnClass += ' ring-2 ring-white ring-offset-2 ring-offset-slate-950';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-mono flex items-center justify-center transition-all ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Status Summary */}
            <div className="pt-3 border-t border-slate-850 space-y-2 text-xs font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="text-white font-bold">{answeredCount} / {activeQuestions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining:</span>
                <span className="text-slate-400">{activeQuestions.length - answeredCount}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Confirmation Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400 font-mono text-sm font-bold">
                <AlertTriangle className="w-5 h-5" />
                <span>Submit Exam For Grading?</span>
              </div>
              
              <p className="text-xs text-slate-300 leading-relaxed">
                You have answered <strong className="text-white">{answeredCount}</strong> of <strong className="text-white">{activeQuestions.length}</strong> questions.
                {activeQuestions.length - answeredCount > 0 && (
                  <span className="block text-amber-300 mt-1">
                    Warning: You have {activeQuestions.length - answeredCount} unanswered questions that will be marked as incorrect.
                  </span>
                )}
              </p>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750"
                >
                  Return to Exam
                </button>
                <button
                  onClick={calculateAndFinishTest}
                  className="px-5 py-2 rounded-lg text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300"
                >
                  Confirm & Grade Exam
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ----------------------------------------------------
  // 3. FINAL RESULTS DASHBOARD & REVIEW
  // ----------------------------------------------------
  if (testState === 'FINISHED' && finalResult) {
    const isPassing = finalResult.percentage >= 70;

    return (
      <div className="py-8 max-w-4xl mx-auto space-y-8">
        
        {/* Results Hero Header */}
        <div className="p-8 rounded-xl bg-slate-950/90 border border-slate-800 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Assessment Scorecard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isPassing ? 'Examination Passed' : 'Preparation Review Required'}
          </h2>

          {/* Big Score Gauge */}
          <div className="flex items-center justify-center gap-6 py-4">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-extrabold text-emerald-400 font-mono tabular-nums">
                {finalResult.percentage}%
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                Overall Accuracy
              </div>
            </div>

            <div className="h-16 w-px bg-slate-800" />

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono tabular-nums">
                {finalResult.score} / {finalResult.totalQuestions}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                Correct Answers
              </div>
            </div>

            <div className="h-16 w-px bg-slate-800" />

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-sky-400 font-mono tabular-nums">
                {Math.floor(finalResult.timeSpentSeconds / 60)}m {finalResult.timeSpentSeconds % 60}s
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                Time Consumed
              </div>
            </div>
          </div>

          {/* Restart / New Exam Button */}
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => setTestState('SETUP')}
              className="px-6 py-3 rounded-lg text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake / Configure New Exam</span>
            </button>
          </div>
        </div>

        {/* Category Performance Breakdown */}
        <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Competency Breakdown by Domain
          </h3>

          <div className="space-y-3">
            {Object.entries(finalResult.categoryBreakdown).map(([cat, stats]) => {
              const catPercent = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={cat} className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>{cat}</span>
                    <span className="text-slate-400">
                      {stats.correct} / {stats.total} ({catPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        catPercent >= 70 ? 'bg-emerald-400' : catPercent >= 50 ? 'bg-amber-400' : 'bg-rose-500'
                      }`}
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Question-by-Question Forensic Audit
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              {(['All', 'Correct', 'Incorrect', 'Skipped'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setReviewFilter(filter)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    reviewFilter === filter
                      ? 'bg-emerald-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {activeQuestions
              .map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const hasAnswered = userChoice !== undefined;
                const isCorrect = userChoice === q.correctAnswer;

                if (reviewFilter === 'Correct' && !isCorrect) return null;
                if (reviewFilter === 'Incorrect' && (isCorrect || !hasAnswered)) return null;
                if (reviewFilter === 'Skipped' && hasAnswered) return null;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono border-b border-slate-850 pb-2">
                      <span className="text-slate-400">Question #{idx + 1} · {q.category}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        isCorrect
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : hasAnswered
                          ? 'bg-rose-500/10 text-rose-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isCorrect ? 'Correct' : hasAnswered ? 'Incorrect' : 'Skipped'}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white leading-relaxed">
                      {q.question}
                    </h4>

                    {/* Options list */}
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isUserChoice = userChoice === optIdx;
                        const isCorrectAnswer = optIdx === q.correctAnswer;

                        let optClass = 'bg-slate-900/60 border-slate-800 text-slate-400';
                        if (isCorrectAnswer) {
                          optClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-medium';
                        } else if (isUserChoice && !isCorrect) {
                          optClass = 'bg-rose-500/15 border-rose-500 text-rose-200 font-medium';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optClass}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                              <span>{opt}</span>
                            </div>
                            {isCorrectAnswer && <span className="font-mono text-[10px] text-emerald-400">CORRECT ANSWER</span>}
                            {isUserChoice && !isCorrect && <span className="font-mono text-[10px] text-rose-400">YOUR ANSWER</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <div className="font-mono text-emerald-400 font-bold text-[11px]">
                        Forensic Explanation:
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

      </div>
    );
  }

  return null;
};
