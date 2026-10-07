import React from 'react';
import { CEFRLevel, CEFRLevelInfo } from '../types/quiz';
import { BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { soundService } from '../services/soundService';

export const CEFR_LEVELS_INFO: CEFRLevelInfo[] = [
  {
    level: 'A1',
    name: 'Beginner',
    tagline: 'Basic words & simple sentences',
    description: 'Verb to be, have/has, present simple, articles, pronouns & basic prepositions.'
  },
  {
    level: 'A2',
    name: 'Elementary',
    tagline: 'Daily routines & past events',
    description: 'Past continuous, present perfect, comparatives, modals & first conditional.'
  },
  {
    level: 'B1',
    name: 'Intermediate',
    tagline: 'Clear standard communication',
    description: 'Past perfect, passive voice, conditionals, reported speech & phrasal verbs.'
  },
  {
    level: 'B2',
    name: 'Upper-Intermediate',
    tagline: 'Complex texts & spontaneous interaction',
    description: 'Mixed conditionals, inversion, advanced passives, complex clauses & modals.'
  },
  {
    level: 'C1',
    name: 'Advanced',
    tagline: 'Fluent expression & academic structures',
    description: 'Cleft sentences, emphasis, inversion, subjunctive & formal discourse.'
  },
  {
    level: 'C2',
    name: 'Proficiency',
    tagline: 'Near-native precision & nuanced mastery',
    description: 'Subjunctive idioms, high-level rhetoric, complex transformations & academic style.'
  }
];

interface LevelSelectorProps {
  selectedLevel: CEFRLevel;
  onSelectLevel: (level: CEFRLevel) => void;
  questionCount: number;
  onSelectQuestionCount: (count: number) => void;
  availableTopics?: string[];
  selectedTopic?: string;
  onSelectTopic?: (topic: string) => void;
  compact?: boolean;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  onSelectLevel,
  questionCount,
  onSelectQuestionCount,
  availableTopics,
  selectedTopic,
  onSelectTopic,
  compact = false
}) => {
  const countOptions = [10, 20, 30, 50];

  const handleLevelChange = (lvl: CEFRLevel) => {
    soundService.playClick();
    onSelectLevel(lvl);
  };

  const handleCountChange = (cnt: number) => {
    soundService.playClick();
    onSelectQuestionCount(cnt);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1 shrink-0">Level:</span>
          {CEFR_LEVELS_INFO.map((item) => (
            <button
              key={item.level}
              onClick={() => handleLevelChange(item.level)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
                selectedLevel === item.level
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.level}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-semibold text-slate-500 mr-1">Questions:</span>
          {countOptions.map((cnt) => (
            <button
              key={cnt}
              onClick={() => handleCountChange(cnt)}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                questionCount === cnt
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cnt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Level Selection Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 text-sky-600" />
          <h3 className="text-base font-bold text-slate-900">Choose Your CEFR Level</h3>
        </div>
        <p className="text-xs text-slate-500">
          Questions are strictly aligned to the chosen level. Beginners (A1) will not see advanced C1 grammar.
        </p>
      </div>

      {/* CEFR Level Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CEFR_LEVELS_INFO.map((item) => {
          const isSelected = selectedLevel === item.level;
          return (
            <button
              key={item.level}
              onClick={() => handleLevelChange(item.level)}
              className={`relative text-left p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-sky-600 bg-sky-50/70 shadow-sm ring-1 ring-sky-600'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-base font-extrabold ${isSelected ? 'text-sky-700' : 'text-slate-900'}`}>
                  {item.level} — {item.name}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                )}
              </div>
              <p className="text-xs font-medium text-slate-600 mb-1">{item.tagline}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
            </button>
          );
        })}
      </div>

      {/* Quiz Length & Topic Filter */}
      <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Length selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Quiz Length:</span>
          <div className="flex items-center gap-1.5">
            {countOptions.map((cnt) => (
              <button
                key={cnt}
                onClick={() => handleCountChange(cnt)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  questionCount === cnt
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cnt} Questions
              </button>
            ))}
          </div>
        </div>

        {/* Optional topic selector */}
        {availableTopics && availableTopics.length > 0 && onSelectTopic && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-700 shrink-0">Topic:</span>
            <select
              value={selectedTopic || 'all'}
              onChange={(e) => onSelectTopic(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="all">All Level Topics</option>
              {availableTopics.map((top) => (
                <option key={top} value={top}>{top}</option>
              ))}
            </select>
          </div>
        )}
      </div>

    </div>
  );
};
