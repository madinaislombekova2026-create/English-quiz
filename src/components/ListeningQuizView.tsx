import React, { useState, useEffect } from 'react';
import { ListeningExercise, CEFRLevel } from '../types/quiz';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  EyeOff,
  Headphones,
  Check
} from 'lucide-react';
import { speechService, soundService } from '../services/soundService';

interface ListeningQuizViewProps {
  level: CEFRLevel;
  exercises: ListeningExercise[];
  onComplete: (correctCount: number, total: number) => void;
  onChooseAnother: () => void;
}

export const ListeningQuizView: React.FC<ListeningQuizViewProps> = ({
  level,
  exercises,
  onComplete,
  onChooseAnother
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const matchingExercises = exercises.filter((e) => e.level === level);
  const activeExercises = matchingExercises.length > 0 ? matchingExercises : exercises;
  const currentExercise = activeExercises[currentIndex] || exercises[0];
  const total = activeExercises.length;

  const currentAnswer = userAnswers[currentExercise.id];
  const isAnswered = currentAnswer !== undefined;
  const isCurrentCorrect = isAnswered && currentAnswer === currentExercise.correctAnswer;

  // Cleanup speech on unmount or question change
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, [currentIndex]);

  const handlePlayAudio = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speechService.speak(
      currentExercise.audioScript,
      playbackRate,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  const handleReplay = () => {
    speechService.stop();
    setIsPlaying(true);
    speechService.speak(
      currentExercise.audioScript,
      playbackRate,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    const isCorrect = option === currentExercise.correctAnswer;
    if (isCorrect) soundService.playCorrect();
    else soundService.playIncorrect();

    setUserAnswers((prev) => ({
      ...prev,
      [currentExercise.id]: option
    }));
  };

  let correctCount = 0;
  let incorrectCount = 0;
  activeExercises.forEach((e) => {
    const ans = userAnswers[e.id];
    if (ans === e.correctAnswer) correctCount += 1;
    else if (ans !== undefined) incorrectCount += 1;
  });

  const handleNext = () => {
    soundService.playClick();
    speechService.stop();
    setIsPlaying(false);
    setShowTranscript(false);
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      onComplete(correctCount, total);
    }
  };

  const handlePrevious = () => {
    soundService.playClick();
    speechService.stop();
    setIsPlaying(false);
    setShowTranscript(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    speechService.stop();
    setIsFinished(true);
    onComplete(correctCount, total);
  };

  if (isFinished) {
    const percentage = Math.round((correctCount / total) * 100);
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <Headphones className="w-10 h-10 text-sky-600 mx-auto mb-3" />
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Listening Quiz Complete!</h2>
          <p className="text-sm text-slate-500 mb-6">Level {level} Listening Comprehension</p>
          
          <div className="bg-slate-50 p-6 rounded-2xl max-w-xs mx-auto mb-6">
            <div className="text-4xl font-extrabold text-slate-900 tabular-nums">
              {correctCount} / {total}
            </div>
            <div className="text-xl font-bold text-sky-600 tabular-nums">{percentage}%</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setUserAnswers({});
                setCurrentIndex(0);
                setIsFinished(false);
              }}
              className="px-6 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl hover:bg-sky-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onChooseAnother}
              className="px-6 py-2.5 bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors"
            >
              Choose Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      
      {/* Top Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Headphones className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            LISTENING COMPREHENSION · LEVEL {level}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
            Question {currentIndex + 1} / {total}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {correctCount}
          </span>
          <span className="text-rose-500 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> {incorrectCount}
          </span>
        </div>
      </div>

      {/* Audio Player Card strictly matching prompt */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Audio Player Box */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Audio Track: {currentExercise.title} ({currentExercise.speakerRole})
              </span>
            </div>

            {/* Speed toggle */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs font-semibold">
              {[0.8, 1.0, 1.2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackRate(spd)}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    playbackRate === spd ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Large Play Audio Controls strictly matching prompt */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-2">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePlayAudio}
                className="w-full sm:w-auto px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Square className="w-4 h-4 fill-white" />
                    <span>Pause Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>▶ Play Audio</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReplay}
                className="px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Replay Audio"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay</span>
              </button>
            </div>

            {/* Dynamic Wave Visualizer */}
            <div className="flex items-center gap-1 h-8">
              {[40, 70, 30, 90, 60, 85, 45, 100, 65, 80, 50, 95].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 bg-sky-400 rounded-full transition-all duration-150 ${
                    isPlaying ? 'opacity-100' : 'opacity-30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * (0.6 + Math.random() * 0.4)))}%` : '20%'
                  }}
                />
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center sm:text-left">
            Tip: Listen carefully to the audio clip above before choosing your answer. You can replay as many times as you like.
          </p>
        </div>

        {/* Question Area */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            {currentExercise.question}
          </h3>

          <div className="space-y-3">
            {currentExercise.options.map((opt, idx) => {
              const letter = optionLetters[idx] || String(idx + 1);
              const isSelected = currentAnswer === opt;
              const isThisCorrect = opt === currentExercise.correctAnswer;

              let styles = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

              if (isAnswered) {
                if (isThisCorrect) {
                  styles = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isThisCorrect) {
                  styles = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold ring-1 ring-rose-500';
                } else {
                  styles = 'border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${styles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? (isThisCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white')
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {letter}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isThisCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isThisCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Immediate Feedback Box */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border text-xs ${
            isCurrentCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="font-bold text-sm mb-1 flex items-center gap-1.5">
              {isCurrentCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>✓ Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>✗ Incorrect</span>
                </>
              )}
            </div>

            {!isCurrentCorrect && (
              <p className="font-semibold mb-2">
                Correct answer: <span className="text-emerald-700 font-bold">{currentExercise.correctAnswer}</span>
              </p>
            )}

            {currentExercise.explanation && (
              <p className="text-slate-700 pt-2 border-t border-slate-200/60 leading-relaxed">
                <span className="font-bold text-slate-900">Explanation: </span>
                {currentExercise.explanation}
              </p>
            )}

            {/* Transcript Reveal Option */}
            <div className="mt-3 pt-2 border-t border-slate-200/60">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-[11px] font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showTranscript ? 'Hide Audio Transcript' : 'Show Audio Transcript'}</span>
              </button>

              {showTranscript && (
                <div className="mt-2 p-3 bg-white rounded-lg border border-slate-200 text-slate-800 italic">
                  "{currentExercise.audioScript}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation bottom */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {currentIndex < total - 1 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
            >
              Finish Quiz <Check className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
