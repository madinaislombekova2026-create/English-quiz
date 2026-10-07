import React from 'react';
import { Category } from '../types/quiz';

interface FooterProps {
  onSelectCategory: (cat: Category | 'home') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-sky-500 text-white flex items-center justify-center font-bold text-sm">
                E
              </span>
              <span className="text-white font-bold tracking-tight text-base">English Quiz</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive English practice platform aligned with CEFR standards (A1 to C2). Practice grammar, vocabulary, reading, listening, writing and educational games.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Quiz Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('grammar')} className="hover:text-white transition-colors cursor-pointer">
                  English Grammar Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('vocabulary')} className="hover:text-white transition-colors cursor-pointer">
                  Vocabulary & Meanings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('reading')} className="hover:text-white transition-colors cursor-pointer">
                  Reading Comprehension
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('listening')} className="hover:text-white transition-colors cursor-pointer">
                  Listening Exercises
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('writing')} className="hover:text-white transition-colors cursor-pointer">
                  Sentence Writing & Rewriting
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">CEFR Framework</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><span className="text-sky-400 font-medium">A1</span> Beginner · Everyday basics</li>
              <li><span className="text-sky-400 font-medium">A2</span> Elementary · Routine communication</li>
              <li><span className="text-sky-400 font-medium">B1</span> Intermediate · Independent usage</li>
              <li><span className="text-sky-400 font-medium">B2</span> Upper-Intermediate · Fluent reasoning</li>
              <li><span className="text-sky-400 font-medium">C1</span> Advanced · Sophisticated structures</li>
              <li><span className="text-sky-400 font-medium">C2</span> Proficiency · Academic mastery</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Interactive Games</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('games')} className="hover:text-white transition-colors cursor-pointer">
                  Grammar Race (Speed Challenge)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('games')} className="hover:text-white transition-colors cursor-pointer">
                  Sentence Builder (Word Ordering)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('games')} className="hover:text-white transition-colors cursor-pointer">
                  Word Match & Scramble
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('games')} className="hover:text-white transition-colors cursor-pointer">
                  True or False Grammar Check
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} English Quiz. Dedicated to clear and fast language practice.</p>
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <span>CEFR Aligned</span>
            <span>·</span>
            <span>Self-Paced Practice</span>
            <span>·</span>
            <span>No Speaking/Mic Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
