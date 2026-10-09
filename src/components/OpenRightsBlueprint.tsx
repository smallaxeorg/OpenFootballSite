import React from 'react';
import { Radio, Layers, Users, CheckCircle2, XCircle, Sparkles, Building2, Eye, ShieldAlert } from 'lucide-react';

export const OpenRightsBlueprint: React.FC = () => {
  return (
    <section id="open-rights" className="py-16 lg:py-20 bg-[#090d16] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Editorial Heading */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            The Structural Case
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-[1.15] [text-wrap:balance]">
            The Problem Is Exclusivity: The Case for a Wholesale Market
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            The fundamental flaw in modern football broadcasting isn't how much football costs to produce—it is the practice of selling live matches exclusively to a closed corporate duopoly. Here is why an open, per-viewer wholesale model changes everything.
          </p>
        </div>

        {/* 3 Core Principles Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: The Core Mechanism */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Radio className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400">PRINCIPLE 01</span>
              <h3 className="text-lg font-bold text-white">Wholesale Feed Sold to Anyone</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Instead of auctioning exclusive rights to Sky and TNT, the league makes the clean match feed available <strong>wholesale to any provider, creator, or platform</strong> that wants to buy it. No exclusive packages, no locked bidding wars.
            </p>
          </div>

          {/* Card 2: Per-Viewer Wholesale Pricing */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Eye className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-sky-400">PRINCIPLE 02</span>
              <h3 className="text-lg font-bold text-white">Charged Wholesale Per Viewer</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Streams are billed wholesale based on actual viewership (per view). The league can set whatever wholesale price it wants for matches (£5, £10, or whatever the market will bear). Because it is billed per view, <strong>small and niche providers can compete on equal footing</strong> with corporate giants without massive upfront guarantees.
            </p>
          </div>

          {/* Card 3: Free Market Innovation */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-purple-400">PRINCIPLE 03</span>
              <h3 className="text-lg font-bold text-white">Custom Commentary & Business Models</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Providers buy the wholesale feed and add their own value over the top: tactical breakdowns, passionate fan commentary, regional radio, or custom graphics. Providers are completely free to sell to consumers using <strong>any business model</strong>—annual pass, monthly sub, pay-per-match, or niche fan bundle.
            </p>
          </div>
        </div>

        {/* Detailed Comparative Breakdown */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              The Exclusive Monopoly vs. The Open Wholesale Market
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              How eliminating exclusivity restores competition, empowers creators, and serves supporters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
            {/* The Exclusive Duopoly */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>The Current Exclusive Model (Sky & TNT)</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Artificial Duopoly:</strong> Splitting exclusive packages forces fans to maintain two expensive subscriptions (£647–£780/yr) just to follow one club.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Small Clubs Penalized:</strong> Mid-table and promoted teams are televised less often, driving their effective cost to over £60 per match.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>New Entrants Locked Out:</strong> Smaller broadcasters, fan channels, and creators cannot buy rights due to prohibitive multi-billion-pound upfront auction requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>One-Size-Fits-All Punditry:</strong> Fans are forced to listen to identical corporate commentary with zero alternative options.</span>
                </li>
              </ul>
            </div>

            {/* The Open Wholesale Model */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Open Wholesale Model</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Anyone Can Buy Rights:</strong> The clean match stream is sold wholesale to any licensed provider, creator, or platform without exclusivity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Priced Per Viewer (Viewership-Based):</strong> Billed based on actual stream viewers so independent channels and niche creators can compete alongside major networks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Freedom of Commentary & Graphics:</strong> Providers overlay their own tactical analysis, supporter passion, local radio, or bespoke live graphics over the match feed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Open Market Business Models:</strong> Providers decide how to monetize—fixed annual fee, monthly sub, pay-per-match, or sponsor-funded. Fans choose the provider and pricing model that suits them.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Deep Dive: Why Per-Viewer Wholesale Enables Niche Creators */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Market Mechanism Insight</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Why Per-Viewer Wholesale Unlocks the Creator Economy
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In traditional sports rights auctions, leagues demand hundreds of millions of pounds in upfront minimum guarantees. Only massive multi-billion-dollar media conglomerates like Comcast (Sky) and Warner Bros. Discovery (TNT) can bid.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By shifting to a <strong>per-viewer wholesale model</strong>, upfront barriers vanish. If a tactician or a club fan collective has 5,000 dedicated subscribers, they only pay the league wholesale for those 5,000 views. The league receives full compensation for every set of eyes watching the game, while independent creators can build thriving businesses delivering tailored analysis, graphics, and commentary directly to their communities.
          </p>
        </div>
      </div>
    </section>
  );
};
