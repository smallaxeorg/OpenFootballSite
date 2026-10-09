import React from 'react';
import { ArrowRight, AlertTriangle, Tv, DollarSign, TrendingUp, Radio } from 'lucide-react';

interface HeroProps {
  onScrollToCalculator: () => void;
  onScrollToBlueprint: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCalculator, onScrollToBlueprint }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column Hero split with clean whitespace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Column 1: Editorial Headline & Focus */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              The Problem With Exclusive Game Rights
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.1] [text-wrap:balance]">
              The £650+ Fan Tax: Paying Up to £64 Per Televised Match
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Because exclusive television rights are divided between Sky Sports and TNT Sports, supporters of every club must pay for both networks. But while Big Six fans get 28–30 televised games at <span className="text-emerald-400 font-semibold">~£21 per match</span>, mid-table and promoted supporters get as few as 10—paying up to <span className="text-rose-400 font-semibold underline decoration-rose-400/60 underline-offset-4">£64 per match</span>.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 space-y-2">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-medium">The Core Problem Is Exclusivity:</strong> Locking matches into exclusive broadcast monopolies forces fans into expensive double-subscriptions and shuts out competition. If match streams were sold <strong>wholesale per viewer to any provider</strong>, anyone could buy the rights, add their own commentary, graphics, and analysis, and sell it to consumers under any business model they choose.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToCalculator}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-98 flex items-center gap-2 group"
              >
                <span>Compare Your Club vs The Big Six</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={onScrollToBlueprint}
                className="px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
              >
                The Open Wholesale Case
              </button>
            </div>
          </div>

          {/* Column 2: Dominant Photographic Focal Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_football_broadcast_1791572007131.jpg"
                alt="Televised English Premier League match with broadcast camera rig overlooking a packed stadium under floodlights"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>DOMESTIC RIGHTS: £6.7BN EXCLUSIVE DEAL</span>
                  <span>SKY & TNT DUOPOLY</span>
                </div>
                <p className="text-xs text-slate-200">
                  Exclusivity locks fans into two subscriptions while shutting out independent creators, fan channels, and new broadcast entrants.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Quantitative Impact Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Direct Annual Minimum</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              £647.76
            </div>
            <p className="text-xs text-slate-400">
              NOW Saver + TNT HBO Max direct OTT 12-month baseline. Up to £780 on cable.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Tv className="w-4 h-4 text-emerald-400" />
              <span>Big Six Unit Cost</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">
              £21.59 <span className="text-xs font-normal text-slate-400">/ match</span>
            </div>
            <p className="text-xs text-slate-400">
              Liverpool (30 games) & Arsenal (29 games) heavily televised across Sky & TNT.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <TrendingUp className="w-4 h-4 text-rose-400" />
              <span>Lower Club Unit Cost</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-400 font-mono tabular-nums">
              £64.78 <span className="text-xs font-normal text-slate-400">/ match</span>
            </div>
            <p className="text-xs text-slate-400">
              Ipswich & Southampton fans pay identical £647+ fees for only 10 televised games.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Radio className="w-4 h-4 text-sky-400" />
              <span>The Wholesale Alternative</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-mono tabular-nums">
              Per Viewer
            </div>
            <p className="text-xs text-slate-400">
              Streams sold wholesale per view so any provider can compete and innovate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
