import { db } from './index.ts';
import { users, userProgress, testResults, chatMessages } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, displayName?: string, photoUrl?: string) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
        photoUrl: photoUrl || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          displayName: displayName || null,
          photoUrl: photoUrl || null,
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database getOrCreateUser failed:', error);
    throw new Error('Failed to synchronize user profile', { cause: error });
  }
}

export async function getDbUserProgress(uid: string) {
  try {
    const rows = await db.select().from(userProgress).where(eq(userProgress.userId, uid));
    if (rows.length > 0) {
      return {
        bookmarkedQuestionIds: JSON.parse(rows[0].bookmarkedQuestionIds || '[]'),
        completedProblemIds: JSON.parse(rows[0].completedProblemIds || '[]'),
        completedCaseStudyIds: JSON.parse(rows[0].completedCaseStudyIds || '[]'),
        notes: rows[0].notes || '',
      };
    }
    return null;
  } catch (error) {
    console.error('Database getDbUserProgress failed:', error);
    throw new Error('Failed to load user progress', { cause: error });
  }
}

export async function saveDbUserProgress(
  uid: string,
  data: {
    bookmarkedQuestionIds?: string[];
    completedProblemIds?: string[];
    completedCaseStudyIds?: string[];
    notes?: string;
  }
) {
  try {
    const values = {
      userId: uid,
      bookmarkedQuestionIds: JSON.stringify(data.bookmarkedQuestionIds || []),
      completedProblemIds: JSON.stringify(data.completedProblemIds || []),
      completedCaseStudyIds: JSON.stringify(data.completedCaseStudyIds || []),
      notes: data.notes ?? '',
      updatedAt: new Date(),
    };

    const res = await db
      .insert(userProgress)
      .values(values)
      .onConflictDoUpdate({
        target: userProgress.userId,
        set: {
          bookmarkedQuestionIds: values.bookmarkedQuestionIds,
          completedProblemIds: values.completedProblemIds,
          completedCaseStudyIds: values.completedCaseStudyIds,
          notes: values.notes,
          updatedAt: new Date(),
        },
      })
      .returning();

    return res[0];
  } catch (error) {
    console.error('Database saveDbUserProgress failed:', error);
    throw new Error('Failed to save user progress', { cause: error });
  }
}

export async function recordDbTestResult(
  uid: string,
  result: {
    totalQuestions: number;
    score: number;
    percentage: number;
    timeSpentSeconds: number;
    categoryBreakdown: Record<string, any>;
  }
) {
  try {
    const inserted = await db
      .insert(testResults)
      .values({
        userId: uid,
        totalQuestions: result.totalQuestions,
        score: result.score,
        percentage: result.percentage,
        timeSpentSeconds: result.timeSpentSeconds,
        categoryBreakdown: JSON.stringify(result.categoryBreakdown),
      })
      .returning();

    return inserted[0];
  } catch (error) {
    console.error('Database recordDbTestResult failed:', error);
    throw new Error('Failed to record test result', { cause: error });
  }
}

export async function getDbTestResults(uid: string) {
  try {
    const rows = await db
      .select()
      .from(testResults)
      .where(eq(testResults.userId, uid))
      .orderBy(desc(testResults.createdAt));

    return rows.map((r) => ({
      id: 'db-' + r.id,
      timestamp: r.createdAt ? new Date(r.createdAt).getTime() : Date.now(),
      dateStr: r.createdAt ? new Date(r.createdAt).toLocaleString() : '',
      totalQuestions: r.totalQuestions,
      score: r.score,
      percentage: r.percentage,
      timeSpentSeconds: r.timeSpentSeconds,
      categoryBreakdown: JSON.parse(r.categoryBreakdown || '{}'),
    }));
  } catch (error) {
    console.error('Database getDbTestResults failed:', error);
    throw new Error('Failed to fetch test results', { cause: error });
  }
}

export async function saveDbChatMessage(
  sessionId: string,
  role: 'user' | 'model',
  content: string,
  modelUsed?: string,
  groundingSources?: any[],
  userId?: string
) {
  try {
    const inserted = await db
      .insert(chatMessages)
      .values({
        sessionId,
        role,
        content,
        modelUsed: modelUsed || null,
        groundingSources: groundingSources ? JSON.stringify(groundingSources) : null,
        userId: userId || null,
      })
      .returning();

    return inserted[0];
  } catch (error) {
    console.error('Database saveDbChatMessage failed:', error);
    throw new Error('Failed to save chat message', { cause: error });
  }
}

export async function getDbChatMessages(sessionId: string) {
  try {
    const rows = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);

    return rows.map((r) => ({
      id: r.id,
      role: r.role as 'user' | 'model',
      content: r.content,
      modelUsed: r.modelUsed,
      groundingSources: r.groundingSources ? JSON.parse(r.groundingSources) : null,
      createdAt: r.createdAt,
    }));
  } catch (error) {
    console.error('Database getDbChatMessages failed:', error);
    throw new Error('Failed to load chat history', { cause: error });
  }
}
