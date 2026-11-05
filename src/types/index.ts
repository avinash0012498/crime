export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProblemStatement {
  id: string;
  number: number;
  title: string;
  shortSummary: string;
  difficulty: DifficultyLevel;
  domain: string;
  description: string;
  realWorldScenario: string;
  whyItMatters: string;
  proposedTechnicalApproach: string[];
  technologies: string[];
  expectedOutcome: string;
  participantQuestions: string[];
  evaluationCriteria: string[];
}

export type QuestionCategory =
  | 'Cybersecurity'
  | 'Artificial Intelligence and Machine Learning'
  | 'Digital Forensics'
  | 'Ethical Hacking'
  | 'OSINT'
  | 'Criminal Investigation'
  | 'Data Analysis'
  | 'Software Development'
  | 'Database Management'
  | 'General Hackathon Questions';

export interface Question {
  id: string;
  category: QuestionCategory;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  tags: string[];
}

export interface CaseEvidence {
  id: string;
  type: 'Network Log' | 'Memory Dump' | 'Disk Artifact' | 'Financial Record' | 'Chat Transcript' | 'EXIF Metadata' | 'Domain Record';
  title: string;
  snippet: string;
  details: string;
}

export interface CaseStudyQuestion {
  id: string;
  question: string;
  hint: string;
  solution: string;
}

export interface InvestigationWorkflowStep {
  step: number;
  title: string;
  description: string;
  recommendedTools: string[];
}

export interface CaseStudy {
  id: string;
  caseCode: string;
  title: string;
  threatType: string;
  difficulty: DifficultyLevel;
  background: string;
  incidentDossier: string;
  evidenceProvided: CaseEvidence[];
  investigationObjectives: string[];
  questionsToSolve: CaseStudyQuestion[];
  suggestedWorkflow: InvestigationWorkflowStep[];
  expectedSolution: string;
  ethicalForensicWarning: string;
}

export interface JudgeQuestion {
  id: string;
  category: 'Problem & Value' | 'Technical Architecture' | 'AI & Accuracy' | 'Security & Defense' | 'Feasibility & Roadmaps';
  question: string;
  whyJudgesAsk: string;
  keyPoints: string[];
  sampleAnswer: string;
  commonPitfalls: string;
}

export interface LearningResource {
  id: string;
  category: 'Cybersecurity' | 'Digital Forensics' | 'AI & Machine Learning' | 'Ethical Hacking' | 'OSINT' | 'Hackathon Strategy';
  title: string;
  description: string;
  docType: 'Standard' | 'Framework' | 'Cheatsheet' | 'Tooling' | 'Guide';
  tags: string[];
  keyTopics: string[];
  actionableTip: string;
}

export interface TestResultHistory {
  id: string;
  timestamp: number;
  dateStr: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
}

export interface UserProgressState {
  bookmarkedQuestionIds: string[];
  completedProblemIds: string[];
  completedCaseStudyIds: string[];
  testHistory: TestResultHistory[];
  notes: string;
}
