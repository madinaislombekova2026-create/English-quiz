import { UserStats } from '../types/quiz';

const STORAGE_KEY = 'english_quiz_user_stats';

const DEFAULT_STATS: UserStats = {
  xp: 120,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  quizzesCompleted: 4,
  totalCorrect: 38,
  totalAnswered: 45,
  highScores: {
    'grammar-race': 140,
    'word-match': 300,
    'sentence-builder': 250,
    'vocab-challenge': 180,
    'word-scramble': 120,
    'fill-gap': 200,
    'true-false': 160
  }
};

export const getSavedUserStats = (): UserStats => {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATS));
      return DEFAULT_STATS;
    }
    return JSON.parse(raw) as UserStats;
  } catch {
    return DEFAULT_STATS;
  }
};

export const saveUserStats = (stats: UserStats) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors
  }
};

export const recordQuizResult = (correctCount: number, totalQuestions: number, xpGained: number) => {
  const current = getSavedUserStats();
  const today = new Date().toISOString().split('T')[0];

  let newStreak = current.streak;
  if (current.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (current.lastActiveDate === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  const updated: UserStats = {
    ...current,
    xp: current.xp + xpGained,
    streak: newStreak,
    lastActiveDate: today,
    quizzesCompleted: current.quizzesCompleted + 1,
    totalCorrect: current.totalCorrect + correctCount,
    totalAnswered: current.totalAnswered + totalQuestions
  };

  saveUserStats(updated);
  return updated;
};

export const recordGameScore = (gameKey: string, score: number, xpGained: number) => {
  const current = getSavedUserStats();
  const oldHigh = current.highScores[gameKey] || 0;
  const newHigh = Math.max(oldHigh, score);

  const updated: UserStats = {
    ...current,
    xp: current.xp + xpGained,
    highScores: {
      ...current.highScores,
      [gameKey]: newHigh
    }
  };

  saveUserStats(updated);
  return updated;
};
