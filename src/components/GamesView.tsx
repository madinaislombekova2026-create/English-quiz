import React, { useState } from 'react';
import { Question } from '../types/quiz';
import { WORD_MATCH_SETS } from '../data/gamesData';
import { 
  Zap, 
  Flame, 
  RotateCcw, 
  Trophy, 
  ArrowRight,
  Sparkles,
  Gamepad2,
  Clock,
  Shuffle,
  Layers,
  HelpCircle
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { GrammarRaceGame } from './games/GrammarRaceGame';
import { WordMatchGame } from './games/WordMatchGame';
import { SentenceBuilderGame } from './games/SentenceBuilderGame';
import { VocabChallengeGame } from './games/VocabChallengeGame';
import { WordScrambleGame } from './games/WordScrambleGame';
import { FillGapGame } from './games/FillGapGame';
import { TrueFalseGame } from './games/TrueFalseGame';

export type GameKey = 
  | 'grammar-race'
  | 'word-match'
  | 'sentence-builder'
  | 'vocab-challenge'
  | 'word-scramble'
  | 'fill-gap'
  | 'true-false';

interface GamesViewProps {
  grammarQuestions: Question[];
  vocabQuestions: Question[];
  highScores: Record<string, number>;
  onFinishGame: (gameKey: GameKey, score: number, xp: number) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({
  grammarQuestions,
  vocabQuestions,
  highScores,
  onFinishGame
}) => {
  const [activeGame, setActiveGame] = useState<GameKey | null>(null);

  const gameList: {
    key: GameKey;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    tagline: string;
    badge: string;
    color: string;
    bgColor: string;
  }[] = [
    {
      key: 'grammar-race',
      title: 'Grammar Race',
      description: 'Answer grammar questions against the clock! Correct answers grant extra time and combo score multipliers.',
      icon: Clock,
      tagline: '45s Time Attack',
      badge: 'Speed Run',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      key: 'word-match',
      title: 'Word Match',
      description: 'Match English vocabulary words with their accurate definitions or synonyms before the timer expires.',
      icon: Layers,
      tagline: '6 Pairs Challenge',
      badge: 'Memory & Meaning',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50'
    },
    {
      key: 'sentence-builder',
      title: 'Sentence Builder',
      description: 'Arrange scrambled word tiles into grammatically correct English sentences in proper syntactic order.',
      icon: Sparkles,
      tagline: 'Syntax Puzzles',
      badge: 'Order & Form',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      key: 'vocab-challenge',
      title: 'Vocabulary Challenge',
      description: 'Rapid-fire vocabulary questions. Test your word intuition under time pressure with streak rewards.',
      icon: Zap,
      tagline: 'Rapid Fire',
      badge: 'Word Power',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      key: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble letters to decode target English words. Use clues and hints when you get stuck.',
      icon: Shuffle,
      tagline: 'Letter Jumble',
      badge: 'Spelling & Lexis',
      color: 'text-violet-600',
      bgColor: 'bg-violet-50'
    },
    {
      key: 'fill-gap',
      title: 'Fill the Gap',
      description: 'Complete sentences with the missing grammatical word as fast as you can to trigger speed combos.',
      icon: Gamepad2,
      tagline: 'Fast Sentence Fill',
      badge: 'Grammar Flow',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'true-false',
      title: 'True or False',
      description: 'Judge whether tricky grammar sentences and usage rules are standard English or errors.',
      icon: HelpCircle,
      tagline: 'Speed Judgment',
      badge: 'Rule Mastery',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  const handleLaunch = (key: GameKey) => {
    soundService.playClick();
    setActiveGame(key);
  };

  const handleBack = () => {
    soundService.playClick();
    setActiveGame(null);
  };

  const handleGameComplete = (score: number, xp: number) => {
    if (activeGame) {
      onFinishGame(activeGame, score, xp);
    }
  };

  if (activeGame === 'grammar-race') {
    return (
      <GrammarRaceGame
        questions={grammarQuestions}
        onFinishGame={(score, xp) => handleGameComplete(score, xp)}
        onBackToGames={handleBack}
      />
    );
  }

  if (activeGame === 'word-match') {
    return (
      <WordMatchGame
        matchSets={WORD_MATCH_SETS}
        onFinishGame={(score, xp) => handleGameComplete(score, xp)}
        onBackToGames={handleBack}
      />
    );
  }

  if (activeGame === 'sentence-builder') {
    return (
      <SentenceBuilderGame
        onFinishGame={(score, xp) => handleGameComplete(score, xp)}
        onBackToGames={handleBack}
      />
    );
  }

  if (activeGame === 'vocab-challenge') {
    return (
      <VocabChallengeGame
        questions={vocabQuestions}
        onFinishGame={(score, xp) => handleGameComplete(score, xp)}
        onBackToGames={handleBack}
      />
    );
  }

  if (activeGame === 'word-scramble') {
    return (
      <WordScrambleGame
        onFinishGame={(score, xp) => handleGameComplete(score, xp)}
        onBackToGames={handleBack}
      />
    );
  }

  if (activeGame === 'fill-gap') {
    return (
      <FillGapGame
        onFinishGame={(score, xp) => handleGameComplete(score, xp)}
        onBackToGames={handleBack}
      />
    );
  }

  if (activeGame === 'true-false') {
    return (
      <TrueFalseGame
        onFinishGame={(score, xp) => handleGameComplete(score, xp)}
        onBackToGames={handleBack}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Games Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full mb-1">
          <Gamepad2 className="w-4 h-4 text-violet-600" />
          <span>Educational English Mini-Games</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          English Games Arena
        </h1>
        <p className="text-sm text-slate-600">
          Reinforce grammar rules, sentence order, and vocabulary retention through fast, addictive game modes with live combos and XP.
        </p>
      </div>

      {/* 7 Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameList.map((g) => {
          const Icon = g.icon;
          const best = highScores[g.key] || 0;

          return (
            <div
              key={g.key}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${g.bgColor} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <Icon className={`w-6 h-6 ${g.color}`} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    {g.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {g.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  {g.tagline}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {g.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Best: <span className="tabular-nums text-slate-800">{best}</span> pts</span>
                </div>

                <button
                  onClick={() => handleLaunch(g.key)}
                  className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Play</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
