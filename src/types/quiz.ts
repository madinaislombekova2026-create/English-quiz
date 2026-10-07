export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type Category = 
  | 'grammar'
  | 'vocabulary'
  | 'reading'
  | 'listening'
  | 'writing'
  | 'games';

export interface CEFRLevelInfo {
  level: CEFRLevel;
  name: string;
  description: string;
  tagline: string;
}

export interface Question {
  id: string;
  category: Category;
  level: CEFRLevel;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  type: 'multiple-choice' | 'true-false' | 'main-idea' | 'vocabulary' | 'inference' | 'detail';
}

export interface ReadingPassage {
  id: string;
  level: CEFRLevel;
  title: string;
  topic: string;
  text: string;
  wordCount: number;
  questions: ReadingQuestion[];
}

export interface ListeningExercise {
  id: string;
  level: CEFRLevel;
  title: string;
  topic: string;
  audioScript: string;
  speakerRole: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface WritingExercise {
  id: string;
  level: CEFRLevel;
  type: 'rewrite' | 'correct-mistake' | 'word-order' | 'complete-sentence' | 'short-answer';
  topic: string;
  prompt: string;
  sentenceToModify?: string;
  targetWord?: string;
  acceptableAnswers: string[];
  explanation: string;
  hint?: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  lastActiveDate: string;
  quizzesCompleted: number;
  totalCorrect: number;
  totalAnswered: number;
  highScores: Record<string, number>;
}

export interface QuizSessionState {
  category: Category;
  level: CEFRLevel;
  topic?: string;
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<string, string>; // questionId -> answer
  submittedQuestions: Record<string, boolean>; // questionId -> submitted
  isFinished: boolean;
  startTime: number;
  endTime?: number;
}
