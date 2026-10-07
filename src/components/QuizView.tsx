import React, { useState } from 'react';
import { Question, CEFRLevel, Category } from '../types/quiz';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Flag,
  ArrowRight
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { QuizResults } from './QuizResults';

interface QuizViewProps {
  category: Category;
  level: CEFRLevel;
  questions: Question[];
  onCompleteQuiz: (correctCount: number, total: number) => void;
  onChooseAnotherQuiz: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  category,
  level,
  questions,
  onCompleteQuiz,
  onChooseAnotherQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Compute live scores
  const answeredQuestionIds = Object.keys(userAnswers);
  let correctCount = 0;
  let incorrectCount = 0;

  answeredQuestionIds.forEach((id) => {
    const q = questions.find((item) => item.id === id);
    if (q) {
      if (userAnswers[id] === q.correctAnswer) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    }
  });

  const currentAnswer = userAnswers[currentQuestion.id];
  const isAnswered = currentAnswer !== undefined;
  const isCurrentCorrect = isAnswered && currentAnswer === currentQuestion.correctAnswer;

  const handleSelectOption = (option: string) => {
    if (isAnswered) return; // Answer locked once selected for immediate feedback

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      soundService.playCorrect();
    } else {
      soundService.playIncorrect();
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const handleNext = () => {
    soundService.playClick();
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    soundService.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    onCompleteQuiz(correctCount, totalQuestions);
  };

  const handleTryAgain = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <QuizResults
        category={category}
        level={level}
        questions={questions}
        userAnswers={userAnswers}
        onTryAgain={handleTryAgain}
        onChooseAnotherQuiz={onChooseAnotherQuiz}
      />
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Find letter index for correct answer
  const correctOptionIndex = currentQuestion.options.findIndex((opt) => opt === currentQuestion.correctAnswer);
  const correctLetter = correctOptionIndex >= 0 ? optionLetters[correctOptionIndex] : '';

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 px-4">
      
      {/* Top Header & Metrics Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {category.toUpperCase()} · LEVEL {level}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
              {currentQuestion.topic}
            </span>
          </div>

          {/* Correct / Incorrect counters */}
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="tabular-nums">{correctCount}</span>
            </span>
            <span className="flex items-center gap-1 text-rose-500">
              <XCircle className="w-4 h-4" />
              <span className="tabular-nums">{incorrectCount}</span>
            </span>
            <span className="text-slate-300">|</span>
            <button
              onClick={handleFinish}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Finish Quiz
            </button>
          </div>
        </div>

        {/* Progress bar and question count */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Question {currentIndex + 1} / {totalQuestions}</span>
            <span className="tabular-nums text-slate-400">{progressPercent}%</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-sky-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question quick-jump dots */}
        <div className="flex flex-wrap items-center gap-1 pt-1">
          {questions.map((q, idx) => {
            const answered = userAnswers[q.id];
            const isCorrect = answered === q.correctAnswer;
            const isCurrent = idx === currentIndex;

            let dotColor = 'bg-slate-200 text-slate-600';
            if (answered !== undefined) {
              dotColor = isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  soundService.playClick();
                  setCurrentIndex(idx);
                }}
                className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center ${dotColor} ${
                  isCurrent ? 'ring-2 ring-sky-600 ring-offset-1 scale-110' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Question sentence */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Select the correct option:
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const letter = optionLetters[idx] || String(idx + 1);
            const isSelected = currentAnswer === option;
            const isThisCorrect = option === currentQuestion.correctAnswer;

            let buttonStyles = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyles = 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-semibold ring-1 ring-emerald-500';
              } else if (isSelected && !isThisCorrect) {
                buttonStyles = 'border-rose-500 bg-rose-50/70 text-rose-900 font-semibold ring-1 ring-rose-500';
              } else {
                buttonStyles = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${buttonStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? (isThisCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white')
                      : (isAnswered && isThisCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600')
                  }`}>
                    {letter}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && (
                  <div>
                    {isThisCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isSelected && !isThisCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box strictly matching prompt */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border transition-all ${
            isCurrentCorrect 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 mb-2 font-bold text-base">
              {isCurrentCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700">✓ Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="text-rose-700">✗ Incorrect</span>
                </>
              )}
            </div>

            {!isCurrentCorrect && (
              <p className="text-xs font-semibold text-slate-800 mb-2">
                Correct answer: <span className="text-emerald-700 font-bold">{correctLetter}) {currentQuestion.correctAnswer}</span>
              </p>
            )}

            {currentQuestion.explanation && (
              <p className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-slate-200/60">
                <span className="font-bold text-slate-900">Explanation: </span>
                {currentQuestion.explanation}
              </p>
            )}
          </div>
        )}

        {/* Navigation Bottom Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Finish Quiz</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
