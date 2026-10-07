import React from 'react';
import { Category, CEFRLevel } from '../types/quiz';
import { 
  BookA, 
  SpellCheck, 
  BookOpenText, 
  Headphones, 
  PenTool, 
  Gamepad2, 
  ArrowRight,
  Flame,
  Award,
  Sparkles
} from 'lucide-react';
import { soundService } from '../services/soundService';

interface HomeHeroProps {
  onStartQuiz: (category?: Category) => void;
  onSelectCategory: (cat: Category) => void;
  userXp: number;
  userStreak: number;
  quizzesCompleted: number;
  selectedLevel: CEFRLevel;
  onSelectLevel: (lvl: CEFRLevel) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartQuiz,
  onSelectCategory,
  userXp,
  userStreak,
  quizzesCompleted,
  selectedLevel,
  onSelectLevel
}) => {
  const categories: {
    key: Category;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    bgAccent: string;
  }[] = [
    {
      key: 'grammar',
      title: 'Grammar',
      description: 'Master tenses, conditionals, passives, modals and sentence structures.',
      icon: BookA,
      accentColor: 'text-sky-600',
      bgAccent: 'bg-sky-50'
    },
    {
      key: 'vocabulary',
      title: 'Vocabulary',
      description: 'Expand your word power with meanings, synonyms, antonyms and collocations.',
      icon: SpellCheck,
      accentColor: 'text-blue-600',
      bgAccent: 'bg-blue-50'
    },
    {
      key: 'reading',
      title: 'Reading',
      description: 'Read level-adapted English passages and answer comprehension questions.',
      icon: BookOpenText,
      accentColor: 'text-indigo-600',
      bgAccent: 'bg-indigo-50'
    },
    {
      key: 'listening',
      title: 'Listening',
      description: 'Listen to spoken audio conversations and test your comprehension skills.',
      icon: Headphones,
      accentColor: 'text-cyan-600',
      bgAccent: 'bg-cyan-50'
    },
    {
      key: 'writing',
      title: 'Writing',
      description: 'Practice sentence rewriting, error correction and grammatical order.',
      icon: PenTool,
      accentColor: 'text-teal-600',
      bgAccent: 'bg-teal-50'
    },
    {
      key: 'games',
      title: 'English Games',
      description: 'Speed grammar races, word match, sentence builder and unscrambler games.',
      icon: Gamepad2,
      accentColor: 'text-violet-600',
      bgAccent: 'bg-violet-50'
    }
  ];

  const levels: { level: CEFRLevel; label: string }[] = [
    { level: 'A1', label: 'Beginner' },
    { level: 'A2', label: 'Elementary' },
    { level: 'B1', label: 'Intermediate' },
    { level: 'B2', label: 'Upper-Int' },
    { level: 'C1', label: 'Advanced' },
    { level: 'C2', label: 'Proficiency' }
  ];

  return (
    <div className="space-y-16">
      
      {/* Main Hero Section */}
      <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 text-center max-w-4xl mx-auto px-4">
        
        {/* Subtle status kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/70 border border-sky-200/60 px-3.5 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Interactive CEFR Practice Platform</span>
          <span aria-hidden="true">·</span>
          <span>No Speaking/Mic Needed</span>
        </div>

        {/* Hero Title strictly matching user prompt */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Test Your English
        </h1>

        {/* Hero Subtitle strictly matching user prompt */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Practice English grammar, vocabulary, reading, listening and writing with interactive quizzes.
        </p>

        {/* Quick Level Selector in Hero */}
        <div className="mb-8 flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Selected Level: <span className="text-sky-600">{selectedLevel}</span>
          </span>
          <div className="flex flex-wrap justify-center gap-1.5 p-1.5 bg-slate-100 rounded-xl max-w-md w-full">
            {levels.map((item) => (
              <button
                key={item.level}
                onClick={() => {
                  soundService.playClick();
                  onSelectLevel(item.level);
                }}
                className={`flex-1 min-w-[54px] py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedLevel === item.level
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {item.level}
              </button>
            ))}
          </div>
        </div>

        {/* Large Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              soundService.playClick();
              onStartQuiz('grammar');
            }}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-sky-600 hover:bg-sky-700 active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Start Quiz</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onSelectCategory('games');
            }}
            className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 text-slate-500" />
            <span>Play English Games</span>
          </button>
        </div>

        {/* Proof / Live User Stats Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-600 text-sm">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-900 tabular-nums">{userStreak}</span>
            <span className="text-xs text-slate-500">Day Streak</span>
          </div>
          <div className="w-px h-6 bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-600" />
            <span className="font-bold text-slate-900 tabular-nums">{userXp}</span>
            <span className="text-xs text-slate-500">Total XP</span>
          </div>
          <div className="w-px h-6 bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <BookA className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900 tabular-nums">{quizzesCompleted}</span>
            <span className="text-xs text-slate-500">Quizzes Finished</span>
          </div>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quiz Categories</h2>
            <p className="text-sm text-slate-500">Select a section to begin targeted practice for level {selectedLevel}</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">6 Interactive Sections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${cat.bgAccent} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                    <Icon className={`w-6 h-6 ${cat.accentColor}`} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {cat.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    Level {selectedLevel}
                  </span>
                  
                  <button
                    onClick={() => {
                      soundService.playClick();
                      onSelectCategory(cat.key);
                    }}
                    className="px-4 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-600 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Start</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CEFR Level Overview Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 block">
              Global Language Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
              Calibrated to CEFR Guidelines
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Every question is carefully structured from A1 (Beginner) up to C2 (Proficiency). You will never face complex inversion or mixed conditionals on A1, nor will C2 bother you with basic verb to be.
            </p>
            <div className="flex flex-wrap gap-2">
              {levels.map((item) => (
                <button
                  key={item.level}
                  onClick={() => {
                    soundService.playClick();
                    onSelectLevel(item.level);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    selectedLevel === item.level
                      ? 'bg-sky-500 border-sky-400 text-white'
                      : 'border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  {item.level} {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
