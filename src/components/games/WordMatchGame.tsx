import React, { useState, useEffect } from 'react';
import { WordMatchPair } from '../../data/gamesData';
import { Zap, Timer, Flame, Award, RotateCcw, ArrowLeft, Check } from 'lucide-react';
import { soundService } from '../../services/soundService';
import confetti from 'canvas-confetti';

interface WordMatchGameProps {
  matchSets: WordMatchPair[][];
  onFinishGame: (score: number, xp: number) => void;
  onBackToGames: () => void;
}

export const WordMatchGame: React.FC<WordMatchGameProps> = ({
  matchSets,
  onFinishGame,
  onBackToGames
}) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentPairs = matchSets[currentSetIndex % matchSets.length];

  // Scramble cards for display
  const [shuffledWords, setShuffledWords] = useState<WordMatchPair[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<WordMatchPair[]>([]);

  useEffect(() => {
    setShuffledWords([...currentPairs].sort(() => Math.random() - 0.5));
    setShuffledMeanings([...currentPairs].sort(() => Math.random() - 0.5));
    setMatchedIds([]);
    setSelectedWord(null);
    setSelectedMeaning(null);
  }, [currentSetIndex]);

  // Timer loop
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
    confetti({ particleCount: 70, spread: 60 });
    onFinishGame(score, Math.round(score * 1.2));
  };

  const handleWordClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundService.playClick();
    setSelectedWord(id);
    if (selectedMeaning) {
      checkMatch(id, selectedMeaning);
    }
  };

  const handleMeaningClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundService.playClick();
    setSelectedMeaning(id);
    if (selectedWord) {
      checkMatch(selectedWord, id);
    }
  };

  const checkMatch = (wordId: string, meaningId: string) => {
    if (wordId === meaningId) {
      // Correct match!
      soundService.playCorrect();
      const newMatched = [...matchedIds, wordId];
      setMatchedIds(newMatched);
      setSelectedWord(null);
      setSelectedMeaning(null);

      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 20 + newStreak * 5;
      setScore((prev) => prev + points);

      // Check if all in current set are matched
      if (newMatched.length === currentPairs.length) {
        if (currentSetIndex + 1 < matchSets.length) {
          setCurrentSetIndex((prev) => prev + 1);
        } else {
          finishGame();
        }
      }
    } else {
      // Incorrect match
      soundService.playIncorrect();
      setStreak(0);
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedMeaning(null);
      }, 400);
    }
  };

  const handleRestart = () => {
    setCurrentSetIndex(0);
    setScore(0);
    setStreak(0);
    setTimer(60);
    setIsGameOver(false);
  };

  if (isGameOver) {
    const xpGained = Math.round(score * 1.2);
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <Award className="w-12 h-12 text-sky-600 mx-auto" />
          <h2 className="text-3xl font-extrabold text-slate-900">Word Match Complete!</h2>
          <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-4xl font-black text-slate-900 tabular-nums">{score} pts</div>
            <div className="text-xs text-sky-700 font-bold uppercase tracking-wide">+{xpGained} XP Earned</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
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
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      
      {/* HUD Header */}
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

      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900">Word Match</h2>
        <p className="text-xs text-slate-500">Tap a word on the left, then tap its correct meaning on the right.</p>
      </div>

      {/* Two columns: Words vs Meanings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Words Column */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block">Words</span>
          {shuffledWords.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedWord === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleWordClick(item.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-xl border text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                    : isSelected
                    ? 'bg-sky-50 border-sky-600 text-sky-900 ring-2 ring-sky-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <span>{item.word}</span>
                {isMatched && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Meanings Column */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block">Definitions</span>
          {shuffledMeanings.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedMeaning === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleMeaningClick(item.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                    : isSelected
                    ? 'bg-sky-50 border-sky-600 text-sky-900 ring-2 ring-sky-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>{item.meaning}</span>
                {isMatched && <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
};
