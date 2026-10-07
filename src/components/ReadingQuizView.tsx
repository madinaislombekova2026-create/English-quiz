import React, { useState } from 'react';
import { ReadingPassage, CEFRLevel } from '../types/quiz';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  ListFilter,
  Check
} from 'lucide-react';
import { soundService } from '../services/soundService';

interface ReadingQuizViewProps {
  level: CEFRLevel;
  passages: ReadingPassage[];
  onComplete: (correctCount: number, total: number) => void;
  onChooseAnother: () => void;
}

export const ReadingQuizView: React.FC<ReadingQuizViewProps> = ({
  level,
  passages,
  onComplete,
  onChooseAnother
}) => {
  const [selectedPassageIndex, setSelectedPassageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Filter passages matching level, fallback to first available
  const matchingPassages = passages.filter((p) => p.level === level);
  const currentPassage = matchingPassages[selectedPassageIndex] || passages[0];

  if (!currentPassage) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <p className="text-slate-500 mb-4">No reading passage found for level {level}.</p>
        <button onClick={onChooseAnother} className="px-4 py-2 bg-sky-600 text-white rounded-lg">
          Choose Another Quiz
        </button>
      </div>
    );
  }

  const questions = currentPassage.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const currentAnswer = userAnswers[currentQuestion.id];
  const isAnswered = currentAnswer !== undefined;
  const isCurrentCorrect = isAnswered && currentAnswer === currentQuestion.correctAnswer;

  let correctCount = 0;
  let incorrectCount = 0;
  questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (ans === q.correctAnswer) correctCount += 1;
    else if (ans !== undefined) incorrectCount += 1;
  });

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) soundService.playCorrect();
    else soundService.playIncorrect();

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const handleNext = () => {
    soundService.playClick();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      onComplete(correctCount, totalQuestions);
    }
  };

  const handlePrevious = () => {
    soundService.playClick();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    onComplete(correctCount, totalQuestions);
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <BookOpen className="w-10 h-10 text-sky-600 mx-auto mb-3" />
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Reading Assessment Finished!</h2>
          <p className="text-base text-slate-600 mb-6">Passage: {currentPassage.title}</p>
          
          <div className="bg-slate-50 p-6 rounded-2xl max-w-xs mx-auto mb-6">
            <div className="text-4xl font-extrabold text-slate-900 tabular-nums">
              {correctCount} / {totalQuestions}
            </div>
            <div className="text-xl font-bold text-sky-600 tabular-nums">{percentage}%</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-sky-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Read Again & Retry</span>
            </button>
            <button
              onClick={onChooseAnother}
              className="px-6 py-2.5 bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <ListFilter className="w-4 h-4" />
              <span>Choose Another Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      
      {/* Passage Top Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            READING COMPREHENSION · LEVEL {level}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
            {currentPassage.wordCount} words
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

      {/* Split layout: Passage on Left / Questions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Reading Passage Card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block mb-1">
              {currentPassage.topic}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {currentPassage.title}
            </h2>
          </div>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {currentPassage.text}
          </div>
        </div>

        {/* Right: Interactive Question Deck */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase">
              {currentQuestion.type}
            </span>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
              {currentQuestion.question}
            </h3>

            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const letter = optionLetters[idx] || String(idx + 1);
                const isSelected = currentAnswer === opt;
                const isThisCorrect = opt === currentQuestion.correctAnswer;

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
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${styles}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? (isThisCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white')
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {letter}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-xs ${
              isCurrentCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="font-bold mb-1 flex items-center gap-1.5">
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
                <p className="font-semibold mb-1">
                  Correct answer: <span className="text-emerald-700">{currentQuestion.correctAnswer}</span>
                </p>
              )}
              {currentQuestion.explanation && (
                <p className="text-slate-600 pt-1.5 border-t border-slate-200/60 leading-relaxed">
                  <span className="font-bold text-slate-800">Explanation: </span>
                  {currentQuestion.explanation}
                </p>
              )}
            </div>
          )}

          {/* Bottom Deck Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
              >
                Finish <Check className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
