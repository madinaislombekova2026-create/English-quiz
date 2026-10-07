/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Category, CEFRLevel, Question } from './types/quiz';
import { GRAMMAR_QUESTIONS } from './data/grammarQuestions';
import { VOCABULARY_QUESTIONS } from './data/vocabularyQuestions';
import { READING_PASSAGES } from './data/readingPassages';
import { LISTENING_EXERCISES } from './data/listeningExercises';
import { WRITING_EXERCISES } from './data/writingExercises';
import { 
  getSavedUserStats, 
  recordQuizResult, 
  recordGameScore 
} from './services/storageService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { LevelSelector } from './components/LevelSelector';
import { QuizView } from './components/QuizView';
import { ReadingQuizView } from './components/ReadingQuizView';
import { ListeningQuizView } from './components/ListeningQuizView';
import { WritingQuizView } from './components/WritingQuizView';
import { GamesView, GameKey } from './components/GamesView';
import { soundService } from './services/soundService';

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Prepare questions with randomized order & randomized answer options
function prepareQuiz(
  pool: Question[],
  level: CEFRLevel,
  count: number,
  topicFilter?: string
): Question[] {
  let filtered = pool.filter((q) => q.level === level);
  if (topicFilter && topicFilter !== 'all') {
    filtered = filtered.filter((q) => q.topic.toLowerCase() === topicFilter.toLowerCase());
  }

  // Fallback if not enough questions in exact topic
  if (filtered.length === 0) {
    filtered = pool.filter((q) => q.level === level);
  }

  const shuffledPool = shuffleArray(filtered);

  // If user requested more questions than pool, expand by cycling through uniquely keyed copies
  const selected: Question[] = [];
  let index = 0;
  while (selected.length < count && selected.length < Math.max(count, filtered.length)) {
    const base = shuffledPool[index % shuffledPool.length];
    selected.push({
      ...base,
      id: `${base.id}-${selected.length}`
    });
    index++;
    if (index >= shuffledPool.length && selected.length >= count) {
      break;
    }
  }

  // Shuffle options for each selected question
  return selected.map((q) => {
    return {
      ...q,
      options: shuffleArray(q.options)
    };
  });
}

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<Category | 'home'>('home');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A2');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[]>([]);

  // Persistent user stats
  const [userStats, setUserStats] = useState(getSavedUserStats());

  // Extract available grammar topics for the current level
  const availableGrammarTopics = useMemo(() => {
    const topics = new Set<string>();
    GRAMMAR_QUESTIONS.filter((q) => q.level === selectedLevel).forEach((q) => {
      topics.add(q.topic);
    });
    return Array.from(topics);
  }, [selectedLevel]);

  // Launch a new quiz session with randomized questions and options
  const handleStartQuiz = (category: Category = 'grammar') => {
    soundService.playClick();
    setCurrentCategory(category);

    if (category === 'grammar') {
      const prepared = prepareQuiz(GRAMMAR_QUESTIONS, selectedLevel, questionCount, selectedTopic);
      setActiveQuizQuestions(prepared);
      setQuizActive(true);
    } else if (category === 'vocabulary') {
      const prepared = prepareQuiz(VOCABULARY_QUESTIONS, selectedLevel, questionCount, selectedTopic);
      setActiveQuizQuestions(prepared);
      setQuizActive(true);
    } else {
      // Reading, Listening, Writing, Games have their dedicated active views
      setQuizActive(true);
    }
  };

  const handleSelectNavCategory = (cat: Category | 'home') => {
    if (cat === 'home') {
      setCurrentCategory('home');
      setQuizActive(false);
      return;
    }

    setCurrentCategory(cat);
    if (cat === 'grammar' || cat === 'vocabulary') {
      // Start or refresh quiz for this category
      const pool = cat === 'grammar' ? GRAMMAR_QUESTIONS : VOCABULARY_QUESTIONS;
      const prepared = prepareQuiz(pool, selectedLevel, questionCount, 'all');
      setActiveQuizQuestions(prepared);
      setQuizActive(true);
    } else {
      setQuizActive(true);
    }
  };

  const handleQuizComplete = (correctCount: number, total: number) => {
    const xpGained = correctCount * 15;
    const updated = recordQuizResult(correctCount, total, xpGained);
    setUserStats(updated);
  };

  const handleGameComplete = (gameKey: GameKey, score: number, xp: number) => {
    const updated = recordGameScore(gameKey, score, xp);
    setUserStats(updated);
  };

  const handleChooseAnotherQuiz = () => {
    soundService.playClick();
    setQuizActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Sticky Top Navigation Bar */}
      <Navbar
        currentCategory={currentCategory}
        onSelectCategory={handleSelectNavCategory}
        xp={userStats.xp}
        streak={userStats.streak}
      />

      {/* Main App Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* VIEW 1: HOME PAGE */}
        {currentCategory === 'home' && (
          <HomeHero
            onStartQuiz={(cat) => handleStartQuiz(cat || 'grammar')}
            onSelectCategory={(cat) => {
              handleSelectNavCategory(cat);
            }}
            userXp={userStats.xp}
            userStreak={userStats.streak}
            quizzesCompleted={userStats.quizzesCompleted}
            selectedLevel={selectedLevel}
            onSelectLevel={(lvl) => setSelectedLevel(lvl)}
          />
        )}

        {/* VIEW 2: GRAMMAR OR VOCABULARY QUIZ */}
        {(currentCategory === 'grammar' || currentCategory === 'vocabulary') && (
          <div className="space-y-6">
            
            {/* Level & Question count selector toolbar */}
            {!quizActive ? (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    {currentCategory === 'grammar' ? 'English Grammar Quiz' : 'Vocabulary Quiz'}
                  </h1>
                  <p className="text-sm text-slate-600">
                    Choose your level and number of questions to start practicing.
                  </p>
                </div>

                <LevelSelector
                  selectedLevel={selectedLevel}
                  onSelectLevel={(lvl) => {
                    setSelectedLevel(lvl);
                    setSelectedTopic('all');
                  }}
                  questionCount={questionCount}
                  onSelectQuestionCount={(cnt) => setQuestionCount(cnt)}
                  availableTopics={currentCategory === 'grammar' ? availableGrammarTopics : undefined}
                  selectedTopic={selectedTopic}
                  onSelectTopic={(top) => setSelectedTopic(top)}
                />

                <div className="text-center pt-2">
                  <button
                    onClick={() => handleStartQuiz(currentCategory)}
                    className="px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Start {selectedLevel} {currentCategory === 'grammar' ? 'Grammar' : 'Vocabulary'} Quiz ({questionCount} Questions)
                  </button>
                </div>
              </div>
            ) : (
              <QuizView
                category={currentCategory}
                level={selectedLevel}
                questions={activeQuizQuestions}
                onCompleteQuiz={handleQuizComplete}
                onChooseAnotherQuiz={handleChooseAnotherQuiz}
              />
            )}

          </div>
        )}

        {/* VIEW 3: READING QUIZ */}
        {currentCategory === 'reading' && (
          <div className="space-y-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Reading Comprehension</h1>
                <p className="text-xs text-slate-500">Read the passage and answer targeted questions for CEFR {selectedLevel}</p>
              </div>

              {/* Quick Level Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
                {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      soundService.playClick();
                      setSelectedLevel(lvl);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      selectedLevel === lvl
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <ReadingQuizView
              level={selectedLevel}
              passages={READING_PASSAGES}
              onComplete={(correct, total) => handleQuizComplete(correct, total)}
              onChooseAnother={() => handleSelectNavCategory('home')}
            />
          </div>
        )}

        {/* VIEW 4: LISTENING QUIZ */}
        {currentCategory === 'listening' && (
          <div className="space-y-6">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Listening Exercises</h1>
                <p className="text-xs text-slate-500">Play spoken audio tracks and test comprehension for level {selectedLevel}</p>
              </div>

              {/* Quick Level Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
                {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      soundService.playClick();
                      setSelectedLevel(lvl);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      selectedLevel === lvl
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <ListeningQuizView
              level={selectedLevel}
              exercises={LISTENING_EXERCISES}
              onComplete={(correct, total) => handleQuizComplete(correct, total)}
              onChooseAnother={() => handleSelectNavCategory('home')}
            />
          </div>
        )}

        {/* VIEW 5: WRITING EXERCISES */}
        {currentCategory === 'writing' && (
          <div className="space-y-6">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Sentence Writing Practice</h1>
                <p className="text-xs text-slate-500">Rewriting, error correction, and syntactic transformations for level {selectedLevel}</p>
              </div>

              {/* Quick Level Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
                {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      soundService.playClick();
                      setSelectedLevel(lvl);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      selectedLevel === lvl
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <WritingQuizView
              level={selectedLevel}
              exercises={WRITING_EXERCISES}
              onComplete={(correct, total) => handleQuizComplete(correct, total)}
              onChooseAnother={() => handleSelectNavCategory('home')}
            />
          </div>
        )}

        {/* VIEW 6: ENGLISH GAMES */}
        {currentCategory === 'games' && (
          <GamesView
            grammarQuestions={GRAMMAR_QUESTIONS}
            vocabQuestions={VOCABULARY_QUESTIONS}
            highScores={userStats.highScores}
            onFinishGame={(gameKey, score, xp) => handleGameComplete(gameKey, score, xp)}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleSelectNavCategory} />

    </div>
  );
}
