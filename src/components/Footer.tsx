import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070d] border-t border-slate-900 py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-1">
            <span className="text-lg font-bold text-white font-display">
              OpenStream
            </span>
            <p className="text-slate-400 text-xs max-w-md">
              Demonstrating the economic impact of exclusive broadcast monopolies and presenting the case for open, per-viewer wholesale sports streaming rights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-medium">
            <a href="#calculator" className="hover:text-white transition-colors">Per-Match Cost Calculator</a>
            <a href="#exposure-rankings" className="hover:text-white transition-colors">League Inequity Table</a>
            <a href="#open-rights" className="hover:text-white transition-colors">The Open Wholesale Case</a>
          </div>
        </div>

        {/* Data Sources */}
        <div className="space-y-2 text-slate-500 leading-relaxed text-[11px]">
          <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
            Data Sources & Methodology:
          </div>
          <p>
            Domestic broadcast inventory, tariff architectures, and club exposure metrics derived from: Premier League 2025–2029 domestic rights cycle (£6.7bn agreements with Sky Sports and TNT Sports / Warner Bros. Discovery); English Football League (EFL) 5-year £935m agreement with Sky Sports (Sky Sports+ 1,059 live fixtures); and verified consumer tariff schedules across NOW Sports, Sky Glass/Stream, and HBO Max TNT Sports direct subscriptions. Saturday 3:00pm window acknowledged as preserving matchday attendances across the English football pyramid.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-slate-900 text-slate-600">
            <span>© {new Date().getFullYear()} OpenStream. Built for football supporters and independent sports creators.</span>
            <span>Non-partisan sports broadcast economics and media rights analysis.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
