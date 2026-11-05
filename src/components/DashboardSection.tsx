import React, { useState, useMemo } from 'react';
import { UserProgressState, Question, ProblemStatement, CaseStudy, QuestionCategory } from '../types';
import { Sparkles, Award, Bookmark, FileText, CheckCircle2, RotateCcw, Download, Clock, TrendingUp, HelpCircle, Shield, ArrowRight, Compass, Target, AlertTriangle } from 'lucide-react';
import { downloadNotesAsFile } from '../utils/storage';

// Chart.js imports
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface DashboardSectionProps {
  progress: UserProgressState;
  questions: Question[];
  problemStatements: ProblemStatement[];
  caseStudies: CaseStudy[];
  onUpdateNotes: (notes: string) => void;
  onResetProgress: () => void;
  onNavigateToQuestions: () => void;
  onNavigateToMockTest: () => void;
  onNavigateToChallenges: () => void;
  onNavigateToCases: () => void;
}

const domainCategories: { key: QuestionCategory; shortLabel: string }[] = [
  { key: 'Cybersecurity', shortLabel: 'Cybersecurity' },
  { key: 'Artificial Intelligence and Machine Learning', shortLabel: 'AI & ML' },
  { key: 'Digital Forensics', shortLabel: 'Forensics' },
  { key: 'Ethical Hacking', shortLabel: 'Ethical Hack' },
  { key: 'OSINT', shortLabel: 'OSINT' },
  { key: 'Criminal Investigation', shortLabel: 'Criminal Law' },
  { key: 'Data Analysis', shortLabel: 'Data & Anomaly' },
  { key: 'Software Development', shortLabel: 'Software Eng' },
  { key: 'Database Management', shortLabel: 'Databases' },
  { key: 'General Hackathon Questions', shortLabel: 'Viva & Strategy' }
];

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  progress,
  questions,
  problemStatements,
  caseStudies,
  onUpdateNotes,
  onResetProgress,
  onNavigateToQuestions,
  onNavigateToMockTest,
  onNavigateToChallenges,
  onNavigateToCases
}) => {
  const [notesText, setNotesText] = useState(progress.notes);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const totalTests = progress.testHistory.length;
  const avgScore = totalTests > 0
    ? Math.round(progress.testHistory.reduce((acc, t) => acc + t.percentage, 0) / totalTests)
    : 0;

  const totalQuestionsAnsweredInTests = useMemo(() => {
    return progress.testHistory.reduce((acc, t) => acc + t.totalQuestions, 0);
  }, [progress.testHistory]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotesText(e.target.value);
    onUpdateNotes(e.target.value);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const bookmarkedQuestions = questions.filter((q) => progress.bookmarkedQuestionIds.includes(q.id));

  // Compute category proficiency stats across testHistory
  const categoryStats = useMemo(() => {
    const stats: Record<string, { correct: number; total: number; percentage: number }> = {};

    domainCategories.forEach(({ key }) => {
      stats[key] = { correct: 0, total: 0, percentage: 0 };
    });

    progress.testHistory.forEach((test) => {
      if (test.categoryBreakdown) {
        Object.entries(test.categoryBreakdown).forEach(([cat, { correct, total }]) => {
          if (stats[cat]) {
            stats[cat].correct += correct;
            stats[cat].total += total;
          }
        });
      }
    });

    domainCategories.forEach(({ key }) => {
      const s = stats[key];
      s.percentage = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    });

    return stats;
  }, [progress.testHistory]);

  // Identify highest and lowest proficiency domains
  const { topCategory, weakCategory } = useMemo(() => {
    let top = { key: domainCategories[0].key, label: domainCategories[0].shortLabel, percentage: -1, total: 0 };
    let weak = { key: domainCategories[0].key, label: domainCategories[0].shortLabel, percentage: 101, total: 0 };

    domainCategories.forEach(({ key, shortLabel }) => {
      const st = categoryStats[key];
      if (st.total > 0) {
        if (st.percentage > top.percentage) {
          top = { key, label: shortLabel, percentage: st.percentage, total: st.total };
        }
        if (st.percentage < weak.percentage) {
          weak = { key, label: shortLabel, percentage: st.percentage, total: st.total };
        }
      }
    });

    return {
      topCategory: top.percentage !== -1 ? top : null,
      weakCategory: weak.percentage !== 101 ? weak : null
    };
  }, [categoryStats]);

  // Chart.js Radar Data Configuration
  const radarData = useMemo(() => {
    return {
      labels: domainCategories.map((d) => d.shortLabel),
      datasets: [
        {
          label: 'Your Accuracy (%)',
          data: domainCategories.map((d) => categoryStats[d.key].percentage),
          backgroundColor: 'rgba(16, 185, 129, 0.25)',
          borderColor: '#10b981',
          borderWidth: 2,
          pointBackgroundColor: '#38bdf8',
          pointBorderColor: '#07090e',
          pointBorderWidth: 1.5,
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#10b981',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  }, [categoryStats]);

  // Chart.js Radar Options Configuration
  const radarOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            color: '#64748b',
            backdropColor: 'transparent',
            font: {
              family: 'JetBrains Mono',
              size: 10
            }
          },
          grid: {
            color: 'rgba(56, 189, 248, 0.15)'
          },
          angleLines: {
            color: 'rgba(56, 189, 248, 0.15)'
          },
          pointLabels: {
            color: '#cbd5e1',
            font: {
              family: 'Plus Jakarta Sans',
              size: 11,
              weight: 600
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(14, 18, 27, 0.95)',
          borderColor: 'rgba(56, 189, 248, 0.3)',
          borderWidth: 1,
          titleColor: '#ffffff',
          bodyColor: '#38bdf8',
          titleFont: {
            family: 'Plus Jakarta Sans',
            size: 12,
            weight: 700
          },
          bodyFont: {
            family: 'JetBrains Mono',
            size: 11
          },
          padding: 10,
          callbacks: {
            label: (context: any) => {
              const cat = domainCategories[context.dataIndex];
              const st = categoryStats[cat.key];
              return ` Accuracy: ${context.raw}% (${st.correct}/${st.total} correct)`;
            }
          }
        }
      }
    };
  }, [categoryStats]);

  return (
    <div className="py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Participant Performance Dossier</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Personal Preparation Dashboard
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Real-time tracking of completed challenge blueprints, mock examination scores, bookmarked technical questions, and saved pitch notes.
          </p>
        </div>

        {/* Reset Progress Action */}
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to reset your local progress history? This cannot be undone.')) {
              onResetProgress();
            }
          }}
          className="px-3.5 py-2 text-xs font-mono text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-lg transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Local Progress</span>
        </button>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Tests Taken */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>MOCK TESTS TAKEN</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            {totalTests}
          </div>
          <div className="text-xs text-slate-400">
            Average score: <span className="text-emerald-400 font-bold">{avgScore}%</span>
          </div>
        </div>

        {/* Metric 2: Problem Statements Prepared */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>PREPARED CHALLENGES</span>
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            {progress.completedProblemIds.length} <span className="text-slate-500 text-lg">/ {problemStatements.length}</span>
          </div>
          <div className="text-xs text-slate-400">
            {Math.round((progress.completedProblemIds.length / problemStatements.length) * 100)}% tracks reviewed
          </div>
        </div>

        {/* Metric 3: Case Studies Solved */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>CASES RESOLVED</span>
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            {progress.completedCaseStudyIds.length} <span className="text-slate-500 text-lg">/ {caseStudies.length}</span>
          </div>
          <div className="text-xs text-slate-400">
            {Math.round((progress.completedCaseStudyIds.length / caseStudies.length) * 100)}% dossiers completed
          </div>
        </div>

        {/* Metric 4: Bookmarked Questions */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SAVED QUESTIONS</span>
            <Bookmark className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            {progress.bookmarkedQuestionIds.length}
          </div>
          <div className="text-xs text-slate-400">
            Flagged for review
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* RADAR CHART: TECHNICAL DOMAIN PROFICIENCY (CHART.JS)      */}
      {/* ======================================================== */}
      <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
        
        {/* Radar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Diagnostic Competency Radar · 10 Technical Domains</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Investigative Knowledge Spectrum
            </h3>
            <p className="text-xs text-slate-400">
              Visualizing your empirical accuracy percentage across all hackathon evaluation domains, calibrated directly from your mock test performances.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono shrink-0">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{totalTests} Tests Logged ({totalQuestionsAnsweredInTests} Total Qs)</span>
            </span>
          </div>
        </div>

        {/* Radar Visualization Grid: Left Chart + Right Performance Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Radar Canvas Container (7 cols) */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] flex items-center justify-center p-2 rounded-xl bg-slate-900/40 border border-slate-800/80">
            {totalTests === 0 && (
              <div className="absolute inset-0 z-20 bg-slate-950/75 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center p-6 text-center space-y-3">
                <Target className="w-8 h-8 text-sky-400 animate-pulse" />
                <div className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Radar Awaiting First Mock Exam
                </div>
                <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                  Take a 10, 20, or 30-question mock exam to populate your personal accuracy coordinates across all 10 technical categories.
                </p>
                <button
                  onClick={onNavigateToMockTest}
                  className="px-4 py-2 text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Launch Initial Mock Exam</span>
                </button>
              </div>
            )}
            <Radar data={radarData} options={radarOptions as any} />
          </div>

          {/* Right Performance Diagnostics & Insights (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Top Domain Spotlight */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Strongest Proficiency Domain</span>
                </span>
                {topCategory && (
                  <span className="text-emerald-300 font-mono font-bold">
                    {topCategory.percentage}% Accuracy
                  </span>
                )}
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {topCategory ? topCategory.key : 'Complete a test to calculate'}
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {topCategory
                  ? `Your highest scoring competence area with ${categoryStats[topCategory.key].correct} correct answers out of ${categoryStats[topCategory.key].total} attempted.`
                  : 'Start a timed mock test to reveal your strongest technical defense.'}
              </p>
            </div>

            {/* Needs Focus Spotlight */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Recommended Focus Area</span>
                </span>
                {weakCategory && (
                  <span className="text-amber-300 font-mono font-bold">
                    {weakCategory.percentage}% Accuracy
                  </span>
                )}
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {weakCategory ? weakCategory.key : 'Complete a test to calculate'}
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {weakCategory
                  ? `Category with lowest accuracy (${categoryStats[weakCategory.key].correct}/${categoryStats[weakCategory.key].total} correct). Practice this domain to shore up your viva defense.`
                  : 'Taking mock tests will isolate weak spots to rehearse before hackathon judges.'}
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onNavigateToMockTest}
                className="flex-1 px-4 py-2.5 text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Retake Mock Exam</span>
              </button>
              <button
                onClick={onNavigateToQuestions}
                className="flex-1 px-4 py-2.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>Browse Question Bank</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 2-Column Split: Mock Test History Table + Scratchpad Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Mock Exam History (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Examination Attempt Ledger</span>
            </h3>

            <button
              onClick={onNavigateToMockTest}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 underline"
            >
              Take New Test →
            </button>
          </div>

          {progress.testHistory.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-3">
              <Clock className="w-8 h-8 text-slate-600 mx-auto" />
              <p>No completed mock examinations recorded yet.</p>
              <button
                onClick={onNavigateToMockTest}
                className="px-4 py-2 text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg inline-block"
              >
                Start First Mock Exam
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead className="text-[11px] uppercase text-slate-400 border-b border-slate-800 pb-2">
                  <tr>
                    <th className="py-2.5">Date</th>
                    <th className="py-2.5">Size</th>
                    <th className="py-2.5">Score</th>
                    <th className="py-2.5">Accuracy</th>
                    <th className="py-2.5">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {progress.testHistory.slice(0, 10).map((t) => (
                    <tr key={t.id} className="hover:bg-slate-900/50">
                      <td className="py-2.5 text-slate-300">{t.dateStr}</td>
                      <td className="py-2.5 text-slate-400">{t.totalQuestions} Qs</td>
                      <td className="py-2.5 text-white font-bold">{t.score} / {t.totalQuestions}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.percentage >= 70 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                        }`}>
                          {t.percentage}%
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-400">
                        {Math.floor(t.timeSpentSeconds / 60)}m {t.timeSpentSeconds % 60}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Study & Pitch Notes (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Participant Pitch Scratchpad</span>
            </h3>

            <div className="flex items-center gap-2">
              {isSavedNotice && (
                <span className="text-[10px] font-mono text-emerald-400 animate-pulse">
                  Auto-saved
                </span>
              )}
              <button
                onClick={() => downloadNotesAsFile(notesText)}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-900 transition-colors"
                title="Download notes as Markdown (.md)"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Draft your selected track notes, team member roles, and metrics to defend. Stored locally in your browser.
          </p>

          <textarea
            value={notesText}
            onChange={handleNotesChange}
            rows={12}
            placeholder="Type your hackathon preparation notes here..."
            className="w-full p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500 leading-relaxed resize-none"
          />
        </div>

      </div>

      {/* Bookmarked Questions Quick-List */}
      {bookmarkedQuestions.length > 0 && (
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>Saved Review Questions ({bookmarkedQuestions.length})</span>
            </h3>

            <button
              onClick={onNavigateToQuestions}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 underline"
            >
              Open in Question Bank →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedQuestions.slice(0, 4).map((q) => (
              <div key={q.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-emerald-400 font-bold">{q.category}</span>
                  <span>{q.difficulty}</span>
                </div>
                <h4 className="text-xs font-semibold text-white leading-relaxed">
                  {q.question}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">
                  Correct Answer: Option {String.fromCharCode(65 + q.correctAnswer)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
