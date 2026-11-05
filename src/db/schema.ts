import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define the 'users' table linking with Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define 'user_progress' table for synced participant data
export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .references(() => users.uid)
    .notNull()
    .unique(),
  bookmarkedQuestionIds: text('bookmarked_question_ids').default('[]'),
  completedProblemIds: text('completed_problem_ids').default('[]'),
  completedCaseStudyIds: text('completed_case_study_ids').default('[]'),
  notes: text('notes').default(''),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Define 'test_results' table for persistent mock test score tracking
export const testResults = pgTable('test_results', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .references(() => users.uid)
    .notNull(),
  totalQuestions: integer('total_questions').notNull(),
  score: integer('score').notNull(),
  percentage: integer('percentage').notNull(),
  timeSpentSeconds: integer('time_spent_seconds').notNull(),
  categoryBreakdown: text('category_breakdown').notNull(), // JSON serialized
  createdAt: timestamp('created_at').defaultNow(),
});

// Define 'chat_messages' table for the Gemini investigator assistant
export const chatMessages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),
  sessionId: text('session_id').notNull(),
  role: text('role').notNull(), // 'user' or 'model'
  content: text('content').notNull(),
  modelUsed: text('model_used'),
  groundingSources: text('grounding_sources'), // JSON string of citations
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  progress: one(userProgress, {
    fields: [users.uid],
    references: [userProgress.userId],
  }),
  testResults: many(testResults),
}));

export const testResultsRelations = relations(testResults, ({ one }) => ({
  user: one(users, {
    fields: [testResults.userId],
    references: [users.uid],
  }),
}));
