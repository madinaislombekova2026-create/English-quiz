import React, { useState } from 'react';
import { WritingExercise, CEFRLevel } from '../types/quiz';
import { 
  PenTool, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  ListFilter,
  Check,
  Send
} from 'lucide-react';
import { soundService } from '../services/soundService';

interface WritingQuizViewProps {
  level: CEFRLevel;
  exercises: WritingExercise[];
  onComplete: (correctCount: number, total: number) => void;
  onChooseAnother: () => void;
}

export const WritingQuizView: React.FC<WritingQuizViewProps> = ({
  level,
  exercises,
  onComplete,
  onChooseAnother
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, string>>({});
  const [evaluationResults, setEvaluationResults] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const matchingExercises = exercises.filter((e) => e.level === level);
  const activeExercises = matchingExercises.length > 0 ? matchingExercises : exercises;
  const currentExercise = activeExercises[currentIndex] || exercises[0];
  const total = activeExercises.length;

  const isSubmitted = submittedAnswers[currentExercise.id] !== undefined;
  const isCurrentCorrect = evaluationResults[currentExercise.id] === true;

  // Evaluation helper normalizing punctuation and whitespace
  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isSubmitted) return;

    const normalizedUser = normalize(userInput);
    const isCorrect = currentExercise.acceptableAnswers.some((ans) => {
      return normalize(ans) === normalizedUser;
    });

    if (isCorrect) {
      soundService.playCorrect();
    } else {
      soundService.playIncorrect();
    }

    setSubmittedAnswers((prev) => ({
      ...prev,
      [currentExercise.id]: userInput
    }));

    setEvaluationResults((prev) => ({
      ...prev,
      [currentExercise.id]: isCorrect
    }));
  };

  let correctCount = 0;
  let incorrectCount = 0;
  activeExercises.forEach((ex) => {
    if (evaluationResults[ex.id] === true) correctCount += 1;
    else if (evaluationResults[ex.id] === false) incorrectCount += 1;
  });

  const handleNext = () => {
    soundService.playClick();
    setShowHint(false);
    if (currentIndex < total - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setUserInput(submittedAnswers[activeExercises[nextIndex].id] || '');
    } else {
      setIsFinished(true);
      onComplete(correctCount, total);
    }
  };

  const handlePrevious = () => {
    soundService.playClick();
    setShowHint(false);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setUserInput(submittedAnswers[activeExercises[prevIndex].id] || '');
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    onComplete(correctCount, total);
  };

  if (isFinished) {
    const percentage = Math.round((correctCount / total) * 100);
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <PenTool className="w-10 h-10 text-sky-600 mx-auto mb-3" />
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Writing Practice Complete!</h2>
          <p className="text-sm text-slate-500 mb-6">Level {level} Sentence Construction & Transformation</p>
          
          <div className="bg-slate-50 p-6 rounded-2xl max-w-xs mx-auto mb-6">
            <div className="text-4xl font-extrabold text-slate-900 tabular-nums">
              {correctCount} / {total}
            </div>
            <div className="text-xl font-bold text-sky-600 tabular-nums">{percentage}%</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmittedAnswers({});
                setEvaluationResults({});
                setCurrentIndex(0);
                setUserInput('');
                setIsFinished(false);
              }}
              className="px-6 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl hover:bg-sky-700 transition-colors"
            >
              Practice Again
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

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      
      {/* Top Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            WRITING EXERCISE · LEVEL {level}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
            {currentExercise.topic}
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

      {/* Main Exercise Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Header Prompt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Question {currentIndex + 1} of {total} · {currentExercise.type.replace('-', ' ')}
            </span>
            {currentExercise.hint && (
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            {currentExercise.prompt}
          </h2>

          {showHint && currentExercise.hint && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 mb-4">
              <span className="font-bold">Hint: </span> {currentExercise.hint}
            </div>
          )}

          {currentExercise.sentenceToModify && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm sm:text-base text-slate-800 my-4">
              "{currentExercise.sentenceToModify}"
            </div>
          )}
        </div>

        {/* Input Field Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1.5">
              Type your answer below:
            </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isSubmitted}
              placeholder="Type your transformed or corrected sentence here..."
              className="w-full px-4 py-3.5 text-sm sm:text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-700"
            />
          </div>

          {!isSubmitted && (
            <button
              type="submit"
              disabled={!userInput.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Answer</span>
            </button>
          )}
        </form>

        {/* Submission Feedback & Model Answer strictly matching prompt */}
        {isSubmitted && (
          <div className={`p-5 rounded-xl border text-xs sm:text-sm space-y-3 ${
            isCurrentCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="font-bold flex items-center gap-2">
              {isCurrentCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-base text-emerald-700">✓ Correct! Excellent sentence construction.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span className="text-base text-rose-700">✗ Incorrect. Look at the model answer below.</span>
                </>
              )}
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                Expected Model Answer:
              </span>
              <p className="text-sm font-bold text-slate-900 font-mono">
                {currentExercise.acceptableAnswers[0]}
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed pt-1">
              <span className="font-bold text-slate-900">Grammar rule: </span>
              {currentExercise.explanation}
            </p>
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
              Finish Practice <Check className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
