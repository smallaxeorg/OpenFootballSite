import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onScrollToCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#060911]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <a href="#" className="text-xl font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors">
            OpenStream
          </a>

          {/* Zone 2: Concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#calculator" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Per-Match Cost Calculator
            </a>
            <a href="#exposure-rankings" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              League Inequity Table
            </a>
            <a href="#open-rights" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              The Open Wholesale Case
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={onScrollToCalculator}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20 active:scale-95"
            >
              Compare Your Club
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d16] px-4 pt-2 pb-4 space-y-2 text-sm font-medium text-slate-300">
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white"
          >
            Per-Match Cost Calculator
          </a>
          <a
            href="#exposure-rankings"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white"
          >
            League Inequity Table
          </a>
          <a
            href="#open-rights"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white"
          >
            The Open Wholesale Case
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToCalculator();
              }}
              className="w-full text-center py-2 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg"
            >
              Compare Your Club
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
