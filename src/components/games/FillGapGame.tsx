import React, { useState, useEffect } from 'react';
import { FILL_GAP_ITEMS, FillGapItem } from '../../data/gamesData';
import { Timer, Zap, Flame, Award, RotateCcw, ArrowLeft } from 'lucide-react';
import { soundService } from '../../services/soundService';
import confetti from 'canvas-confetti';

interface FillGapGameProps {
  onFinishGame: (score: number, xp: number) => void;
  onBackToGames: () => void;
}

export const FillGapGame: React.FC<FillGapGameProps> = ({
  onFinishGame,
  onBackToGames
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = FILL_GAP_ITEMS[currentIndex % FILL_GAP_ITEMS.length];

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, score]);

  const finishGame = () => {
    setIsGameOver(true);
    soundService.playFanfare();
    confetti({ particleCount: 60, spread: 60 });
    onFinishGame(score, Math.round(score * 1.25));
  };

  const handleSelectOption = (opt: string) => {
    if (isGameOver) return;
    const isCorrect = opt === currentItem.answer;

    if (isCorrect) {
      soundService.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 20 + newStreak * 5;
      setScore((prev) => prev + points);
      setTimer((prev) => Math.min(prev + 2, 55));
    } else {
      soundService.playIncorrect();
      setStreak(0);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (isGameOver) {
    const xpGained = Math.round(score * 1.25);
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <Award className="w-12 h-12 text-sky-600 mx-auto" />
          <h2 className="text-3xl font-extrabold text-slate-900">Fill the Gap Finished!</h2>
          <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-4xl font-black text-slate-900 tabular-nums">{score} pts</div>
            <div className="text-xs text-sky-700 font-bold uppercase tracking-wide">+{xpGained} XP Earned</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setStreak(0);
                setTimer(45);
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
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <button
          onClick={onBackToGames}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Exit
        </button>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700 tabular-nums">
            <Timer className="w-4 h-4" />
            <span>{timer}s</span>
          </div>
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

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Fill the Gap · Quick Challenge
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentItem.sentence}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentItem.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelectOption(opt)}
              className="p-4 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 text-slate-800 font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
