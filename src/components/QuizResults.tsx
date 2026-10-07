import React, { useEffect } from 'react';
import { Question, CEFRLevel, Category } from '../types/quiz';
import { Award, RotateCcw, ListFilter, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';

interface QuizResultsProps {
  category: Category;
  level: CEFRLevel;
  questions: Question[];
  userAnswers: Record<string, string>;
  onTryAgain: () => void;
  onChooseAnotherQuiz: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  category,
  level,
  questions,
  userAnswers,
  onTryAgain,
  onChooseAnotherQuiz
}) => {
  const total = questions.length;
  let correctCount = 0;
  let incorrectCount = 0;

  questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (ans === q.correctAnswer) {
      correctCount += 1;
    } else if (ans !== undefined) {
      incorrectCount += 1;
    }
  });

  const percentage = Math.round((correctCount / total) * 100);

  // Performance grade message
  let feedbackMessage = 'Keep practicing!';
  let feedbackSubtext = 'Review the explanations below and try again to master this level.';
  let feedbackColor = 'text-amber-600';

  if (percentage >= 90) {
    feedbackMessage = 'Excellent!';
    feedbackSubtext = 'Outstanding mastery of English grammar and usage!';
    feedbackColor = 'text-emerald-600';
  } else if (percentage >= 70) {
    feedbackMessage = 'Good job!';
    feedbackSubtext = 'Solid comprehension across these topics. Keep up the great work!';
    feedbackColor = 'text-sky-600';
  } else if (percentage < 50) {
    feedbackMessage = 'Try again!';
    feedbackSubtext = 'Don’t give up! Consistent practice turns mistakes into mastery.';
    feedbackColor = 'text-rose-600';
  }

  useEffect(() => {
    soundService.playFanfare();
    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6 px-4">
      
      {/* Quiz Complete Hero Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm text-center relative overflow-hidden">
        <div className="inline-flex p-3 rounded-2xl bg-sky-50 text-sky-600 mb-4">
          <Award className="w-8 h-8" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Quiz Complete!
        </h2>
        
        <p className={`text-xl font-bold ${feedbackColor} mb-1`}>
          {feedbackMessage}
        </p>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-8">
          {feedbackSubtext}
        </p>

        {/* Big Score Display */}
        <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto mb-8 border border-slate-100">
          <div className="text-5xl font-black text-slate-900 tracking-tight mb-1 tabular-nums">
            {correctCount} / {total}
          </div>
          <div className="text-2xl font-bold text-sky-600 tabular-nums">
            {percentage}%
          </div>
        </div>

        {/* Detailed counts */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 text-left">
          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-[11px] font-semibold text-emerald-700 uppercase">Correct</div>
              <div className="text-lg font-bold text-emerald-800 tabular-nums">{correctCount}</div>
            </div>
          </div>

          <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl flex items-center gap-2.5">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <div className="text-[11px] font-semibold text-rose-700 uppercase">Incorrect</div>
              <div className="text-lg font-bold text-rose-800 tabular-nums">{incorrectCount}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons strictly matching prompt */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              soundService.playClick();
              onTryAgain();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onChooseAnotherQuiz();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ListFilter className="w-4 h-4" />
            <span>Choose Another Quiz</span>
          </button>
        </div>
      </div>

      {/* Question Review Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Review Answers</h3>
          <span className="text-xs text-slate-500">{total} Questions Evaluated</span>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isUnanswered = userAnswer === undefined;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-white border-emerald-200'
                    : isUnanswered
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-white border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>Question {idx + 1}</span>
                    <span>·</span>
                    <span className="text-sky-700">{q.topic}</span>
                  </div>

                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>

                <p className="text-base font-semibold text-slate-900 mb-3">
                  {q.question}
                </p>

                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-slate-500 min-w-[90px]">Your Answer:</span>
                    <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      {userAnswer || 'Not answered'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-slate-500 min-w-[90px]">Correct Answer:</span>
                      <span className="text-emerald-700 font-bold">{q.correctAnswer}</span>
                    </div>
                  )}
                </div>

                {q.explanation && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-800">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
