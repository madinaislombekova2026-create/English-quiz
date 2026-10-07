import React, { useState } from 'react';
import { Category } from '../types/quiz';
import { Volume2, VolumeX, Flame, Zap, Menu, X } from 'lucide-react';
import { soundService } from '../services/soundService';

interface NavbarProps {
  currentCategory: Category | 'home';
  onSelectCategory: (cat: Category | 'home') => void;
  xp: number;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  xp,
  streak
}) => {
  const [soundOn, setSoundOn] = useState(soundService.isEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = soundService.toggleSound();
    setSoundOn(newState);
  };

  const navItems: { key: Category | 'home'; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'grammar', label: 'Grammar' },
    { key: 'vocabulary', label: 'Vocabulary' },
    { key: 'reading', label: 'Reading' },
    { key: 'listening', label: 'Listening' },
    { key: 'writing', label: 'Writing' },
    { key: 'games', label: 'Games' }
  ];

  const handleNavClick = (key: Category | 'home') => {
    soundService.playClick();
    onSelectCategory(key);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-sky-700 transition-colors flex items-center gap-2 cursor-pointer text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
            E
          </span>
          <span>English Quiz</span>
        </button>

        {/* Zone 2: Primary navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentCategory === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions & quick indicators */}
        <div className="flex items-center gap-3">
          {/* Quick Streak & XP indicators */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100/90 px-3 py-1.5 rounded-lg border border-slate-200/80">
            <span className="flex items-center gap-1 text-amber-600">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="tabular-nums">{streak}</span>d
            </span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-sky-700">
              <Zap className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
              <span className="tabular-nums">{xp}</span> XP
            </span>
          </div>

          {/* Sound audio toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title={soundOn ? 'Sound On' : 'Sound Muted'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Start Quiz Action button if on home */}
          {currentCategory === 'home' && (
            <button
              onClick={() => handleNavClick('grammar')}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 shadow-xs transition-colors cursor-pointer"
            >
              Start Quiz
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1">
          <div className="flex items-center gap-3 py-2 px-3 mb-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1 text-amber-600">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Streak: <span className="font-bold tabular-nums">{streak}</span> days
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-sky-700">
              <Zap className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
              Total XP: <span className="font-bold tabular-nums">{xp}</span>
            </span>
          </div>

          {navItems.map((item) => {
            const isActive = currentCategory === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
