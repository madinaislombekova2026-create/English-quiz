import React, { useState } from 'react';
import { SENTENCE_BUILDER_ITEMS, SentenceBuilderItem } from '../../data/gamesData';
import { ArrowLeft, Check, RotateCcw, Zap, Flame, Award, ArrowRight } from 'lucide-react';
import { soundService } from '../../services/soundService';
import confetti from 'canvas-confetti';

interface SentenceBuilderGameProps {
  onFinishGame: (score: number, xp: number) => void;
  onBackToGames: () => void;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({
  onFinishGame,
  onBackToGames
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    [...SENTENCE_BUILDER_ITEMS[0].words].sort(() => Math.random() - 0.5)
  );
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = SENTENCE_BUILDER_ITEMS[currentIndex];

  const handlePickWord = (word: string, indexInAvailable: number) => {
    soundService.playClick();
    setSelectedWords([...selectedWords, word]);
    const nextAvail = [...availableWords];
    nextAvail.splice(indexInAvailable, 1);
    setAvailableWords(nextAvail);
    setFeedback('idle');
  };

  const handleRemoveWord = (word: string, indexInSelected: number) => {
    soundService.playClick();
    const nextSelected = [...selectedWords];
    nextSelected.splice(indexInSelected, 1);
    setSelectedWords(nextSelected);
    setAvailableWords([...availableWords, word]);
    setFeedback('idle');
  };

  const handleResetCurrent = () => {
    soundService.playClick();
    setSelectedWords([]);
    setAvailableWords([...currentItem.words].sort(() => Math.random() - 0.5));
    setFeedback('idle');
  };

  const checkSentence = () => {
    const constructed = selectedWords.join(' ');
    // compare disregarding punctuation and case
    const normalize = (s: string) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim();

    if (normalize(constructed) === normalize(currentItem.correctSentence)) {
      soundService.playCorrect();
      setFeedback('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 25 + newStreak * 5;
      setScore((prev) => prev + points);

      setTimeout(() => {
        if (currentIndex + 1 < SENTENCE_BUILDER_ITEMS.length) {
          const nextIdx = currentIndex + 1;
          setCurrentIndex(nextIdx);
          setSelectedWords([]);
          setAvailableWords([...SENTENCE_BUILDER_ITEMS[nextIdx].words].sort(() => Math.random() - 0.5));
          setFeedback('idle');
        } else {
          finishGame();
        }
      }, 900);
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
          <h2 className="text-3xl font-extrabold text-slate-900">Sentence Builder Complete!</h2>
          <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-4xl font-black text-slate-900 tabular-nums">{score} pts</div>
            <div className="text-xs text-sky-700 font-bold uppercase tracking-wide">+{xpGained} XP Earned</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedWords([]);
                setAvailableWords([...SENTENCE_BUILDER_ITEMS[0].words].sort(() => Math.random() - 0.5));
                setScore(0);
                setStreak(0);
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
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      
      {/* HUD Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <button
          onClick={onBackToGames}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Exit
        </button>

        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-slate-500">
            Puzzle {currentIndex + 1} / {SENTENCE_BUILDER_ITEMS.length}
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

      {/* Main Builder Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Sentence Builder
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Tap the words in the correct order:
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hint: {currentItem.hint}
          </p>
        </div>

        {/* Selected Words Canvas */}
        <div className={`min-h-[90px] p-4 rounded-xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-all ${
          feedback === 'correct'
            ? 'bg-emerald-50 border-emerald-400'
            : feedback === 'wrong'
            ? 'bg-rose-50 border-rose-400'
            : 'bg-slate-50 border-slate-200'
        }`}>
          {selectedWords.length === 0 ? (
            <span className="text-xs text-slate-400 font-medium">
              Click word tiles below to place them here in order...
            </span>
          ) : (
            selectedWords.map((word, idx) => (
              <button
                key={`${word}-${idx}`}
                onClick={() => handleRemoveWord(word, idx)}
                className="px-3.5 py-2 bg-white text-slate-800 font-bold text-sm rounded-lg border border-slate-300 shadow-xs hover:bg-slate-100 transition-transform active:scale-95 cursor-pointer"
              >
                {word}
              </button>
            ))
          )}
        </div>

        {/* Available Scrambled Words */}
        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-2">Available Words:</span>
          <div className="flex flex-wrap gap-2">
            {availableWords.map((word, idx) => (
              <button
                key={`${word}-${idx}`}
                onClick={() => handlePickWord(word, idx)}
                className="px-4 py-2.5 bg-sky-50 text-sky-800 hover:bg-sky-600 hover:text-white font-bold text-sm rounded-xl border border-sky-200 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback message */}
        {feedback === 'correct' && (
          <div className="p-3 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>✓ Excellent sentence structure! Loading next...</span>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-xl">
            <span className="font-bold">✗ Not quite right.</span> Click word tiles to remove or click reset to try another order.
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handleResetCurrent}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Words</span>
          </button>

          <button
            onClick={checkSentence}
            disabled={selectedWords.length === 0}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Check Sentence</span>
            <Check className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
