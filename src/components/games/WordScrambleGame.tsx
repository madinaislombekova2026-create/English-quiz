import React, { useState } from 'react';
import { WORD_SCRAMBLE_ITEMS, WordScrambleItem } from '../../data/gamesData';
import { ArrowLeft, Check, RotateCcw, Zap, Flame, Award, HelpCircle } from 'lucide-react';
import { soundService } from '../../services/soundService';
import confetti from 'canvas-confetti';

interface WordScrambleGameProps {
  onFinishGame: (score: number, xp: number) => void;
  onBackToGames: () => void;
}

export const WordScrambleGame: React.FC<WordScrambleGameProps> = ({
  onFinishGame,
  onBackToGames
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = WORD_SCRAMBLE_ITEMS[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;

    if (guess.trim().toUpperCase() === currentItem.answer.toUpperCase()) {
      soundService.playCorrect();
      setFeedback('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 25 + newStreak * 5;
      setScore((prev) => prev + points);

      setTimeout(() => {
        if (currentIndex + 1 < WORD_SCRAMBLE_ITEMS.length) {
          setCurrentIndex((prev) => prev + 1);
          setGuess('');
          setShowHint(false);
          setFeedback('idle');
        } else {
          finishGame();
        }
      }, 700);
    } else {
      soundService.playIncorrect();
      setFeedback('wrong');
      setStreak(0);
    }
  };

  const finishGame = () => {
    setIsGameOver(true);
    soundService.playFanfare();
    confetti({ particleCount: 70, spread: 60 });
    onFinishGame(score, Math.round(score * 1.3));
  };

  if (isGameOver) {
    const xpGained = Math.round(score * 1.3);
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <Award className="w-12 h-12 text-sky-600 mx-auto" />
          <h2 className="text-3xl font-extrabold text-slate-900">Word Scramble Complete!</h2>
          <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-4xl font-black text-slate-900 tabular-nums">{score} pts</div>
            <div className="text-xs text-sky-700 font-bold uppercase tracking-wide">+{xpGained} XP Earned</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setGuess('');
                setScore(0);
                setStreak(0);
                setShowHint(false);
                setIsGameOver(false);
              }}
              className="px-6 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl hover:bg-sky-700 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onBackToGames}
              className="px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors"
            >
              All Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      
      {/* HUD Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <button
          onClick={onBackToGames}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Exit
        </button>

        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-slate-500">
            Word {currentIndex + 1} / {WORD_SCRAMBLE_ITEMS.length}
          </span>
          <div className="flex items-center gap-1 text-amber-600">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>{streak}x streak</span>
          </div>
          <div className="flex items-center gap-1 text-sky-700">
            <Zap className="w-4 h-4 fill-sky-600" />
            <span className="tabular-nums">{score} pts</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Word Scramble
          </span>
          <p className="text-xs text-slate-500">Unscramble the jumbled letters to find the English word:</p>
        </div>

        {/* Big Scrambled Letters Display */}
        <div className="p-6 bg-slate-900 rounded-2xl tracking-[0.3em] font-mono font-extrabold text-2xl sm:text-3xl text-sky-400 shadow-inner">
          {currentItem.scrambled}
        </div>

        {/* Hint toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Meaning Clue' : 'Show Meaning Clue'}</span>
          </button>
          {showHint && (
            <p className="text-xs text-slate-600 mt-2 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              "{currentItem.hint}"
            </p>
          )}
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
          <input
            type="text"
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setFeedback('idle');
            }}
            placeholder="Type unscrambled word..."
            autoFocus
            className="w-full px-4 py-3.5 text-center font-bold tracking-widest uppercase bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            type="submit"
            disabled={!guess.trim()}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Submit Word</span>
            <Check className="w-4 h-4" />
          </button>
        </form>

        {feedback === 'correct' && (
          <div className="p-3 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl">
            ✓ Correct! Well solved.
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="p-3 bg-rose-50 text-rose-800 font-bold text-xs rounded-xl">
            ✗ Not quite right. Try again!
          </div>
        )}
      </div>

    </div>
  );
};
