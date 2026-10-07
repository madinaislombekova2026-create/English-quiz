import React, { useState } from 'react';
import { TRUE_FALSE_ITEMS, TrueFalseItem } from '../../data/gamesData';
import { ArrowLeft, CheckCircle2, XCircle, Zap, Flame, Award, RotateCcw } from 'lucide-react';
import { soundService } from '../../services/soundService';
import confetti from 'canvas-confetti';

interface TrueFalseGameProps {
  onFinishGame: (score: number, xp: number) => void;
  onBackToGames: () => void;
}

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({
  onFinishGame,
  onBackToGames
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answeredState, setAnsweredState] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = TRUE_FALSE_ITEMS[currentIndex];

  const handleAnswer = (choice: boolean) => {
    if (answeredState) return;

    const isCorrect = choice === currentItem.isTrue;
    if (isCorrect) {
      soundService.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setScore((prev) => prev + 20 + newStreak * 5);
    } else {
      soundService.playIncorrect();
      setStreak(0);
    }

    setAnsweredState({
      isCorrect,
      explanation: currentItem.explanation
    });
  };

  const handleNext = () => {
    soundService.playClick();
    setAnsweredState(null);
    if (currentIndex + 1 < TRUE_FALSE_ITEMS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsGameOver(true);
      soundService.playFanfare();
      confetti({ particleCount: 70, spread: 60 });
      onFinishGame(score, Math.round(score * 1.2));
    }
  };

  if (isGameOver) {
    const xpGained = Math.round(score * 1.2);
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <Award className="w-12 h-12 text-sky-600 mx-auto" />
          <h2 className="text-3xl font-extrabold text-slate-900">True or False Complete!</h2>
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
                setMaxStreak(0);
                setAnsweredState(null);
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
            Statement {currentIndex + 1} / {TRUE_FALSE_ITEMS.length}
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

      {/* Main Statement Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            True or False
          </span>
          <p className="text-xs text-slate-500">Is this grammar rule or sentence standard?</p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentItem.statement}
          </h2>
        </div>

        {/* Buttons: True vs False */}
        {!answeredState && (
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <button
              onClick={() => handleAnswer(true)}
              className="p-5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-300 rounded-2xl font-black text-lg transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              TRUE
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="p-5 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-800 border border-rose-300 rounded-2xl font-black text-lg transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              FALSE
            </button>
          </div>
        )}

        {/* Immediate Explanation Feedback */}
        {answeredState && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border text-xs sm:text-sm ${
              answeredState.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="font-bold mb-1 flex items-center justify-center gap-1.5">
                {answeredState.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-base text-emerald-700">✓ Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-base text-rose-700">✗ Incorrect!</span>
                  </>
                )}
              </div>
              <p className="text-slate-700 leading-relaxed pt-1">
                {answeredState.explanation}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Next Statement →
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
