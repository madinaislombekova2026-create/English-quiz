import React, { useState, useEffect } from 'react';
import { Question } from '../../types/quiz';
import { Timer, Zap, Flame, Award, RotateCcw, ArrowLeft } from 'lucide-react';
import { soundService } from '../../services/soundService';
import confetti from 'canvas-confetti';

interface GrammarRaceGameProps {
  questions: Question[];
  onFinishGame: (score: number, xp: number) => void;
  onBackToGames: () => void;
}

export const GrammarRaceGame: React.FC<GrammarRaceGameProps> = ({
  questions,
  onFinishGame,
  onBackToGames
}) => {
  const INITIAL_TIME = 45; // 45 seconds countdown
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Timer loop
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver, score, streak]);

  const handleTimeUp = () => {
    setIsGameOver(true);
    soundService.playFanfare();
    const finalXp = Math.round(score * 1.5);
    onFinishGame(score, finalXp);
    confetti({ particleCount: 60, spread: 60 });
  };

  const currentQ = questions[currentIndex % questions.length];

  const handleAnswer = (option: string) => {
    if (isGameOver) return;

    setAnsweredCount((prev) => prev + 1);
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      soundService.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      setComboMultiplier(multiplier);

      const addedScore = 10 * multiplier;
      setScore((prev) => prev + addedScore);
      // bonus second for fast correct answer!
      setTimeLeft((prev) => Math.min(prev + 2, 60));
    } else {
      soundService.playIncorrect();
      setStreak(0);
      setComboMultiplier(1);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setTimeLeft(INITIAL_TIME);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setComboMultiplier(1);
    setAnsweredCount(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    const xpGained = Math.round(score * 1.5);
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-amber-50 text-amber-600">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900">Race Complete!</h2>

          <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto space-y-2">
            <div className="text-4xl font-black text-slate-900 tabular-nums">{score} pts</div>
            <div className="text-xs text-sky-700 font-bold uppercase tracking-wide">+{xpGained} XP Earned</div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto text-left text-xs font-semibold">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Max Streak</span>
              <span className="text-lg text-amber-600 font-bold tabular-nums">{maxStreak}x</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Questions Solved</span>
              <span className="text-lg text-slate-800 font-bold tabular-nums">{answeredCount}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
            <button
              onClick={onBackToGames}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> All Games
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
          {/* Timer */}
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg tabular-nums ${
            timeLeft <= 10 ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-700'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>

          {/* Combo Multiplier */}
          <div className="flex items-center gap-1 text-amber-600">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>{comboMultiplier}x</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 text-sky-700">
            <Zap className="w-4 h-4 fill-sky-600" />
            <span className="tabular-nums">{score} pts</span>
          </div>
        </div>
      </div>

      {/* Speed Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Grammar Race · Fast Answer!
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="p-4 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 text-slate-800 font-semibold text-sm transition-all active:scale-95 cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
