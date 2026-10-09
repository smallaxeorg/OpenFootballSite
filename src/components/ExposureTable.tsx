import React, { useState, useMemo } from 'react';
import { CLUBS_DATA, ClubData, SUBSCRIPTION_MODELS } from '../data/clubsData';
import { ArrowUpDown, Search, Info, HelpCircle } from 'lucide-react';

export const ExposureTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [leagueFilter, setLeagueFilter] = useState<'All' | 'Premier League' | 'Championship'>('All');
  const [sortBy, setSortBy] = useState<'exposure' | 'costPerMatch' | 'blackout' | 'facilityFee'>('exposure');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Compute table rows with baseline Saver cost
  const rows = useMemo(() => {
    return CLUBS_DATA.map(club => {
      const isEfl = club.league.startsWith('EFL');
      const annualCost = isEfl
        ? SUBSCRIPTION_MODELS.ottSaver.skyMonthly * 12 // £335.88
        : SUBSCRIPTION_MODELS.ottSaver.annualTotal; // £647.76

      const costPerMatch = club.televisedMatches > 0
        ? annualCost / club.televisedMatches
        : 0;

      const blackoutPct = Math.round((club.blackoutMatches / club.totalLeagueMatches) * 100);

      return {
        ...club,
        annualCost,
        costPerMatch,
        blackoutPct
      };
    });
  }, []);

  const filteredAndSortedRows = useMemo(() => {
    let result = rows.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.shortName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLeague =
        leagueFilter === 'All' ? true :
        leagueFilter === 'Premier League' ? r.league === 'Premier League' :
        r.league === 'EFL Championship';
      return matchesSearch && matchesLeague;
    });

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'exposure') {
        comparison = a.televisedMatches - b.televisedMatches;
      } else if (sortBy === 'costPerMatch') {
        comparison = a.costPerMatch - b.costPerMatch;
      } else if (sortBy === 'blackout') {
        comparison = a.blackoutMatches - b.blackoutMatches;
      } else if (sortBy === 'facilityFee') {
        comparison = a.facilityFeeMillions - b.facilityFeeMillions;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [rows, searchQuery, leagueFilter, sortBy, sortDirection]);

  const handleSort = (column: 'exposure' | 'costPerMatch' | 'blackout' | 'facilityFee') => {
    if (sortBy === column) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  return (
    <section id="exposure-rankings" className="py-16 lg:py-24 bg-[#060911] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              Empirical Broadcast Data & Rankings
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight [text-wrap:balance]">
              The Monopoly Inequity League Table
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Why do supporters of bottom-half Premier League teams pay nearly <strong>triple</strong> the unit cost per televised game compared to Big Six fans? Full domestic exposure and facility fee breakdown.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search club..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 w-44 sm:w-56"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              {(['All', 'Premier League', 'Championship'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setLeagueFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    leagueFilter === f
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f === 'All' ? 'All (46)' : f === 'Premier League' ? 'Premier League (20)' : 'Championship (24)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Informational Callout Box */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white">How Facility Fees Fuel the Inequality Cycle:</span>
            <p>
              Under the Premier League rights deal, each domestic live TV broadcast yields ~£850,000 in facility fees directly to the club. Because Sky and TNT disproportionately pick marquee clubs (28–30 times/year), Big Six sides pocket £22m–£26m from domestic TV alone, while promoted clubs receive less than £10m.
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th scope="col" className="py-3.5 px-4">Club</th>
                <th scope="col" className="py-3.5 px-4">League Tier</th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleSort('exposure')}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>Televised Matches</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">Carrying Networks</th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleSort('blackout')}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>Saturday 3pm Window</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                  <span className="block text-[10px] text-slate-500 font-normal normal-case">Pyramid Attendance</span>
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleSort('costPerMatch')}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors text-emerald-400"
                  >
                    <span>Unit Cost / Match</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleSort('facilityFee')}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>Facility Fees</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAndSortedRows.map((club) => {
                const isWorstValue = club.costPerMatch > 50;
                const isBestValue = club.costPerMatch < 20;

                return (
                  <tr
                    key={club.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Club Name */}
                    <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: club.primaryColor }}
                        />
                        <span>{club.name}</span>
                      </div>
                    </td>

                    {/* League & Archetype */}
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      <span>{club.league}</span>
                      <span className="text-slate-600 mx-1.5">·</span>
                      <span className="text-slate-400">{club.archetype}</span>
                    </td>

                    {/* Televised Matches */}
                    <td className="py-3.5 px-4 text-right font-mono font-medium text-white tabular-nums whitespace-nowrap">
                      {club.televisedMatches}
                      <span className="text-xs text-slate-500 font-normal"> / {club.totalLeagueMatches}</span>
                    </td>

                    {/* Carrying Networks */}
                    <td className="py-3.5 px-4 text-right text-xs whitespace-nowrap">
                      {club.league === 'Premier League' ? (
                        <div className="inline-flex items-center gap-1 text-slate-300">
                          <span className="text-sky-400 font-mono">{club.skyMatches} Sky</span>
                          <span className="text-slate-600">+</span>
                          <span className="text-rose-400 font-mono">{club.tntMatches} TNT</span>
                        </div>
                      ) : (
                        <span className="text-sky-400 font-mono">Sky Sports+ ({club.skyMatches})</span>
                      )}
                    </td>

                    {/* Blackout Matches */}
                    <td className="py-3.5 px-4 text-right font-mono text-amber-400/90 tabular-nums whitespace-nowrap">
                      {club.blackoutMatches}
                      <span className="text-xs text-slate-500 font-normal"> ({club.blackoutPct}%)</span>
                    </td>

                    {/* Unit Cost Per Match */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold tabular-nums whitespace-nowrap">
                      <span
                        className={
                          isWorstValue
                            ? 'text-rose-400'
                            : isBestValue
                            ? 'text-emerald-400'
                            : 'text-white'
                        }
                      >
                        £{club.costPerMatch.toFixed(2)}
                      </span>
                    </td>

                    {/* Facility Fees */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums whitespace-nowrap">
                      £{club.facilityFeeMillions.toFixed(1)}m
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Bottom Takeaway */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 px-2">
          <div>
            Showing {filteredAndSortedRows.length} clubs across Premier League and EFL broadcast matrices.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Worst Value (£50+/game)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>High Efficiency (&lt;£20/game)</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
