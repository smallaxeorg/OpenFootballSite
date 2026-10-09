import React, { useState, useMemo } from 'react';
import { CLUBS_DATA, ClubData, SUBSCRIPTION_MODELS } from '../data/clubsData';
import { Check, Share2, TrendingUp, Scale, AlertCircle, Sparkles } from 'lucide-react';

export const CostCalculator: React.FC = () => {
  // Selection state
  const [selectedClubId, setSelectedClubId] = useState<string>('ipswich');
  const [benchmarkClubId, setBenchmarkClubId] = useState<string>('liverpool');
  const [leagueFilter, setLeagueFilter] = useState<'All' | 'Premier League' | 'Championship' | 'League One'>('Championship');
  const [pricingPlan, setPricingPlan] = useState<'saver' | 'rolling' | 'cable'>('saver');
  const [includeUltraBoost, setIncludeUltraBoost] = useState<boolean>(false);
  const [copiedShareText, setCopiedShareText] = useState<boolean>(false);

  // Big Six / Benchmark options
  const benchmarkOptions = useMemo(() => {
    return CLUBS_DATA.filter(c => ['liverpool', 'arsenal', 'man-utd', 'man-city', 'chelsea', 'tottenham'].includes(c.id));
  }, []);

  // Filtered clubs
  const availableClubs = useMemo(() => {
    if (leagueFilter === 'All') return CLUBS_DATA;
    if (leagueFilter === 'Premier League') return CLUBS_DATA.filter(c => c.league === 'Premier League');
    if (leagueFilter === 'Championship') return CLUBS_DATA.filter(c => c.league === 'EFL Championship');
    return CLUBS_DATA.filter(c => c.league.includes('League One') || c.league.includes('League Two'));
  }, [leagueFilter]);

  const selectedClub = useMemo(() => {
    return CLUBS_DATA.find(c => c.id === selectedClubId) || CLUBS_DATA[0];
  }, [selectedClubId]);

  const benchmarkClub = useMemo(() => {
    return CLUBS_DATA.find(c => c.id === benchmarkClubId) || CLUBS_DATA[0];
  }, [benchmarkClubId]);

  // Pricing calculations
  const isEfl = selectedClub.league.startsWith('EFL');

  const baseCalculations = useMemo(() => {
    let annualTotal = 0;
    let monthlyRate = 0;
    let skyPortion = 0;
    let tntPortion = 0;

    const boostCostPerMonth = includeUltraBoost ? 6.00 : 0;
    const boostAnnual = boostCostPerMonth * 12;

    if (isEfl) {
      // EFL only requires Sky Sports (Sky Sports+ included)
      if (pricingPlan === 'saver') {
        skyPortion = SUBSCRIPTION_MODELS.ottSaver.skyMonthly;
        monthlyRate = skyPortion + boostCostPerMonth;
        annualTotal = (skyPortion * 12) + boostAnnual;
      } else if (pricingPlan === 'rolling') {
        skyPortion = SUBSCRIPTION_MODELS.ottRolling.skyMonthly;
        monthlyRate = skyPortion + boostCostPerMonth;
        annualTotal = (skyPortion * 10) + (boostCostPerMonth * 10);
      } else {
        skyPortion = SUBSCRIPTION_MODELS.cableHardware.skyMonthly;
        monthlyRate = skyPortion + boostCostPerMonth;
        annualTotal = (skyPortion * 12) + boostAnnual;
      }
    } else {
      // Premier League requires BOTH Sky and TNT
      if (pricingPlan === 'saver') {
        skyPortion = SUBSCRIPTION_MODELS.ottSaver.skyMonthly;
        tntPortion = SUBSCRIPTION_MODELS.ottSaver.tntMonthly;
        monthlyRate = skyPortion + tntPortion + boostCostPerMonth;
        annualTotal = SUBSCRIPTION_MODELS.ottSaver.annualTotal + boostAnnual;
      } else if (pricingPlan === 'rolling') {
        skyPortion = SUBSCRIPTION_MODELS.ottRolling.skyMonthly;
        tntPortion = SUBSCRIPTION_MODELS.ottRolling.tntMonthly;
        monthlyRate = skyPortion + tntPortion + boostCostPerMonth;
        annualTotal = SUBSCRIPTION_MODELS.ottRolling.annualTotal + (boostCostPerMonth * 10);
      } else {
        skyPortion = SUBSCRIPTION_MODELS.cableHardware.skyMonthly;
        tntPortion = SUBSCRIPTION_MODELS.cableHardware.tntMonthly;
        monthlyRate = skyPortion + tntPortion + boostCostPerMonth;
        annualTotal = SUBSCRIPTION_MODELS.cableHardware.annualTotal + boostAnnual;
      }
    }

    const unitCostPerTelevisedMatch = selectedClub.televisedMatches > 0
      ? annualTotal / selectedClub.televisedMatches
      : 0;

    // Benchmark club calculations (always Premier League Big Six)
    let benchmarkAnnualTotal = 0;
    if (pricingPlan === 'saver') {
      benchmarkAnnualTotal = SUBSCRIPTION_MODELS.ottSaver.annualTotal + boostAnnual;
    } else if (pricingPlan === 'rolling') {
      benchmarkAnnualTotal = SUBSCRIPTION_MODELS.ottRolling.annualTotal + (boostCostPerMonth * 10);
    } else {
      benchmarkAnnualTotal = SUBSCRIPTION_MODELS.cableHardware.annualTotal + boostAnnual;
    }

    const benchmarkUnitCost = benchmarkClub.televisedMatches > 0
      ? benchmarkAnnualTotal / benchmarkClub.televisedMatches
      : 0;

    const unitCostDiff = unitCostPerTelevisedMatch - benchmarkUnitCost;
    const unitCostMarkupPercent = benchmarkUnitCost > 0
      ? Math.round((unitCostDiff / benchmarkUnitCost) * 100)
      : 0;

    // TNT cost efficiency for user's club
    const tntAnnual = pricingPlan === 'saver' ? 311.88 : (pricingPlan === 'rolling' ? 309.90 : 336.00);
    const costPerTntMatch = selectedClub.tntMatches > 0
      ? tntAnnual / selectedClub.tntMatches
      : 0;

    return {
      annualTotal,
      monthlyRate,
      skyPortion,
      tntPortion,
      unitCostPerTelevisedMatch,
      benchmarkAnnualTotal,
      benchmarkUnitCost,
      unitCostDiff,
      unitCostMarkupPercent,
      costPerTntMatch
    };
  }, [selectedClub, benchmarkClub, pricingPlan, includeUltraBoost, isEfl]);

  // Social share text
  const shareText = useMemo(() => {
    return `In the UK, watching ${selectedClub.name} on TV costs £${baseCalculations.unitCostPerTelevisedMatch.toFixed(2)} per match (${selectedClub.televisedMatches} televised games), while a ${benchmarkClub.name} fan pays £${baseCalculations.benchmarkUnitCost.toFixed(2)} per match (${benchmarkClub.televisedMatches} games). That's +${baseCalculations.unitCostMarkupPercent}% more per game because of exclusive TV rights monopolies! #OpenStreamFootball`;
  }, [selectedClub, benchmarkClub, baseCalculations]);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedShareText(true);
    setTimeout(() => setCopiedShareText(false), 2500);
  };

  return (
    <section id="calculator" className="py-16 lg:py-20 bg-[#090d16] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Per-Match Cost Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight [text-wrap:balance]">
            Pick Your Club: See What You Pay Per Match vs The Big Six
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Because exclusive TV rights are split between Sky Sports and TNT Sports, supporters must subscribe to both to follow their team's televised games. But while Big Six teams are televised 28–30 times a year, smaller and mid-table sides get as few as 10—forcing their fans to pay up to <strong>300% more per match watched</strong>.
          </p>
        </div>

        {/* Club Selection Controls */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Your Club (6 cols) */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="user-club-select" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                1. Pick Your Football Club:
              </label>
              <div className="flex items-center gap-1 text-[11px]">
                {(['Premier League', 'Championship', 'All'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      setLeagueFilter(tab);
                      if (tab === 'Premier League' && isEfl) setSelectedClubId('ipswich');
                      if (tab === 'Championship' && !isEfl) setSelectedClubId('leeds');
                    }}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      leagueFilter === tab ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab === 'Premier League' ? 'PL (20)' : tab === 'Championship' ? 'Championship (24)' : 'All (46)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <select
                id="user-club-select"
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 font-medium transition-colors cursor-pointer"
              >
                {availableClubs.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.league}) — {c.televisedMatches} televised matches
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedClub.primaryColor }} />
              <span className="text-white font-medium">{selectedClub.name}</span>
              <span>·</span>
              <span className="text-emerald-400 font-mono">{selectedClub.televisedMatches} matches televised</span>
            </div>
          </div>

          {/* Benchmark Club to Compare (6 cols) */}
          <div className="md:col-span-6 space-y-2">
            <label htmlFor="benchmark-club-select" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              2. Compare Against a "Big Six" Club:
            </label>

            <div className="relative">
              <select
                id="benchmark-club-select"
                value={benchmarkClubId}
                onChange={(e) => setBenchmarkClubId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 font-medium transition-colors cursor-pointer"
              >
                {benchmarkOptions.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.televisedMatches} televised matches)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: benchmarkClub.primaryColor }} />
              <span className="text-white font-medium">{benchmarkClub.name}</span>
              <span>·</span>
              <span className="text-sky-400 font-mono">{benchmarkClub.televisedMatches} matches televised</span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Feature */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-700/80 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>Head-to-Head Per-Match Value Comparison</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                {selectedClub.shortName} vs. {benchmarkClub.shortName}
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 px-2 font-medium">Subscription Type:</span>
              {(['saver', 'rolling', 'cable'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPricingPlan(p)}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    pricingPlan === p ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p === 'saver' ? '12-Mo Saver' : p === 'rolling' ? 'Flexible 10-Mo' : 'Cable TV'}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card: User's Club */}
            <div className="md:col-span-5 p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Your Club
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {selectedClub.league}
                  </span>
                </div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: selectedClub.primaryColor }} />
                  <span>{selectedClub.name}</span>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-800/80">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Cost Per Televised Match:</span>
                  <div className="text-3xl sm:text-4xl font-bold font-mono text-rose-400 tabular-nums">
                    £{baseCalculations.unitCostPerTelevisedMatch.toFixed(2)}
                  </div>
                </div>

                <div className="flex justify-between text-xs text-slate-300">
                  <span>Matches on TV:</span>
                  <span className="font-mono font-bold text-white">{selectedClub.televisedMatches} games</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Total annual TV subscription:</span>
                  <span className="font-mono text-slate-300">£{baseCalculations.annualTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                Carried on: <strong className="text-slate-200">Sky Sports ({selectedClub.skyMatches})</strong> {!isEfl && <>+ <strong className="text-slate-200">TNT Sports ({selectedClub.tntMatches})</strong></>}
              </div>
            </div>

            {/* Middle Inequity Indicator (2 cols) */}
            <div className="md:col-span-2 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs text-slate-400 font-medium">Inequity Gap</div>
                {baseCalculations.unitCostDiff > 0 ? (
                  <div className="text-lg font-bold font-mono text-rose-400 tabular-nums">
                    +{baseCalculations.unitCostMarkupPercent}%
                  </div>
                ) : (
                  <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                    Parity
                  </div>
                )}
                <div className="text-[11px] text-slate-400 leading-tight">
                  {baseCalculations.unitCostDiff > 0
                    ? `+£${baseCalculations.unitCostDiff.toFixed(2)} more / match`
                    : 'Equal / lower per match'}
                </div>
              </div>
            </div>

            {/* Right Card: Benchmark Big Six Club */}
            <div className="md:col-span-5 p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Big Six Benchmark
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-mono">
                    High TV Exposure
                  </span>
                </div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: benchmarkClub.primaryColor }} />
                  <span>{benchmarkClub.name}</span>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-800/80">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Cost Per Televised Match:</span>
                  <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 tabular-nums">
                    £{baseCalculations.benchmarkUnitCost.toFixed(2)}
                  </div>
                </div>

                <div className="flex justify-between text-xs text-slate-300">
                  <span>Matches on TV:</span>
                  <span className="font-mono font-bold text-white">{benchmarkClub.televisedMatches} games</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Total annual TV subscription:</span>
                  <span className="font-mono text-slate-300">£{baseCalculations.benchmarkAnnualTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                Carried on: <strong className="text-slate-200">Sky Sports ({benchmarkClub.skyMatches})</strong> + <strong className="text-slate-200">TNT Sports ({benchmarkClub.tntMatches})</strong>
              </div>
            </div>
          </div>

          {/* Deep Insight on Why This Disparity Happens */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Why {selectedClub.shortName} fans pay so much more per game:</strong>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  Both you and a {benchmarkClub.shortName} supporter pay the exact same £{baseCalculations.annualTotal.toFixed(2)} across Sky and TNT. But because the duopoly prioritizes marquee clubs for televised slots, a {benchmarkClub.shortName} fan gets {benchmarkClub.televisedMatches} televised games, lowering their unit cost to £{baseCalculations.benchmarkUnitCost.toFixed(2)}. Meanwhile, you only get {selectedClub.televisedMatches} games, inflating your unit cost to £{baseCalculations.unitCostPerTelevisedMatch.toFixed(2)}.
                  {!isEfl && selectedClub.tntMatches <= 3 && (
                    <span className="block mt-1 text-amber-300">
                      Even worse: TNT Sports broadcasts only <strong>{selectedClub.tntMatches} live {selectedClub.shortName} match{selectedClub.tntMatches > 1 ? 'es' : ''}</strong> all year, yet you must pay £{pricingPlan === 'saver' ? '311.88' : '309.90'} for TNT — that’s <strong>£{baseCalculations.costPerTntMatch.toFixed(2)} per game</strong> just for TNT!
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* How the Open Wholesale Model Solves This */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>The Open Wholesale Market Solution:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                The problem is exclusive rights. If the league sold match feeds <strong>wholesale per viewer to any provider</strong>, the market would open up. Diverse providers could buy rights, add their own commentary and graphics, and sell them using whatever business model works best for their audience—from club-specific passes and flexible pay-per-match options to niche fan subscriptions. Fans would no longer be locked into two expensive corporate monopolies.
              </p>
            </div>

            <button
              onClick={handleCopyShare}
              className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 active:scale-95 shadow-sm shadow-emerald-500/20"
            >
              {copiedShareText ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Stat!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Comparison</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
