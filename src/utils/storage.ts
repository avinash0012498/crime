import { TestResultHistory, UserProgressState } from '../types';

const STORAGE_KEY = 'crimeathon_hub_user_progress_v1';

export function loadUserProgress(): UserProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        bookmarkedQuestionIds: [],
        completedProblemIds: [],
        completedCaseStudyIds: [],
        testHistory: [],
        notes: '# My Crimeathon Study & Pitch Notes\n\n- Problem Selected:\n- Target Users:\n- Killer Feature:\n- Metrics to Defend (Precision/Recall):\n- Backup Offline Demo Video Link:'
      };
    }
    const parsed = JSON.parse(raw);
    return {
      bookmarkedQuestionIds: Array.isArray(parsed.bookmarkedQuestionIds) ? parsed.bookmarkedQuestionIds : [],
      completedProblemIds: Array.isArray(parsed.completedProblemIds) ? parsed.completedProblemIds : [],
      completedCaseStudyIds: Array.isArray(parsed.completedCaseStudyIds) ? parsed.completedCaseStudyIds : [],
      testHistory: Array.isArray(parsed.testHistory) ? parsed.testHistory : [],
      notes: typeof parsed.notes === 'string' ? parsed.notes : ''
    };
  } catch (e) {
    console.error('Failed to load user progress from localStorage', e);
    return {
      bookmarkedQuestionIds: [],
      completedProblemIds: [],
      completedCaseStudyIds: [],
      testHistory: [],
      notes: ''
    };
  }
}

export function saveUserProgress(progress: UserProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress to localStorage', e);
  }
}

export function saveTestResult(result: TestResultHistory): UserProgressState {
  const current = loadUserProgress();
  const updated: UserProgressState = {
    ...current,
    testHistory: [result, ...current.testHistory.slice(0, 49)] // Keep latest 50
  };
  saveUserProgress(updated);
  return updated;
}

export function toggleBookmarkQuestion(questionId: string): UserProgressState {
  const current = loadUserProgress();
  const exists = current.bookmarkedQuestionIds.includes(questionId);
  const updated: UserProgressState = {
    ...current,
    bookmarkedQuestionIds: exists
      ? current.bookmarkedQuestionIds.filter((id) => id !== questionId)
      : [...current.bookmarkedQuestionIds, questionId]
  };
  saveUserProgress(updated);
  return updated;
}

export function toggleCompletedProblem(problemId: string): UserProgressState {
  const current = loadUserProgress();
  const exists = current.completedProblemIds.includes(problemId);
  const updated: UserProgressState = {
    ...current,
    completedProblemIds: exists
      ? current.completedProblemIds.filter((id) => id !== problemId)
      : [...current.completedProblemIds, problemId]
  };
  saveUserProgress(updated);
  return updated;
}

export function toggleCompletedCaseStudy(caseId: string): UserProgressState {
  const current = loadUserProgress();
  const exists = current.completedCaseStudyIds.includes(caseId);
  const updated: UserProgressState = {
    ...current,
    completedCaseStudyIds: exists
      ? current.completedCaseStudyIds.filter((id) => id !== caseId)
      : [...current.completedCaseStudyIds, caseId]
  };
  saveUserProgress(updated);
  return updated;
}

export function saveNotes(notes: string): UserProgressState {
  const current = loadUserProgress();
  const updated: UserProgressState = {
    ...current,
    notes
  };
  saveUserProgress(updated);
  return updated;
}

export function resetAllUserProgress(): UserProgressState {
  const reset: UserProgressState = {
    bookmarkedQuestionIds: [],
    completedProblemIds: [],
    completedCaseStudyIds: [],
    testHistory: [],
    notes: '# My Crimeathon Study & Pitch Notes\n\n- Problem Selected:\n- Target Users:\n- Killer Feature:\n- Metrics to Defend (Precision/Recall):\n- Backup Offline Demo Video Link:'
  };
  saveUserProgress(reset);
  return reset;
}

export function downloadNotesAsFile(notesContent: string, filename = 'crimeathon_investigation_notes.md'): void {
  const blob = new Blob([notesContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
