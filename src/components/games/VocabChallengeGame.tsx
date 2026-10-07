import React, { useState, useEffect } from 'react';
import { Question } from '../../types/quiz';
import { Timer, Zap, Flame, Award, RotateCcw, ArrowLeft } from 'lucide-react';
import { soundService } from '../../services/soundService';
import confetti from 'canvas-confetti';

interface VocabChallengeGameProps {
  questions: Question[];
  onFinishGame: (score: number, xp: number) => void;
  onBackToGames: () => void;
}

export const VocabChallengeGame: React.FC<VocabChallengeGameProps> = ({
  questions,
  onFinishGame,
  onBackToGames
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timer, setTimer] = useState(40);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = questions[currentIndex % questions.length];

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
    onFinishGame(score, Math.round(score * 1.2));
  };

  const handleSelect = (option: string) => {
    if (isGameOver) return;
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      soundService.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const added = 15 + newStreak * 5;
      setScore((prev) => prev + added);
      setTimer((prev) => Math.min(prev + 2, 50));
    } else {
      soundService.playIncorrect();
      setStreak(0);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (isGameOver) {
    const xpGained = Math.round(score * 1.2);
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <Award className="w-12 h-12 text-sky-600 mx-auto" />
          <h2 className="text-3xl font-extrabold text-slate-900">Vocabulary Challenge Done!</h2>
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
                setTimer(40);
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
            Vocabulary Challenge · Rapid Choice
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="p-4 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 text-slate-800 font-semibold text-sm transition-all active:scale-95 cursor-pointer text-left sm:text-center"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
