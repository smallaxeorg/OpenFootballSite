import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CostCalculator } from './components/CostCalculator';
import { ExposureTable } from './components/ExposureTable';
import { OpenRightsBlueprint } from './components/OpenRightsBlueprint';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 selection:bg-emerald-400 selection:text-slate-950 flex flex-col">
      {/* Top Navigation */}
      <Header onScrollToCalculator={() => scrollToSection('calculator')} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onScrollToCalculator={() => scrollToSection('calculator')}
          onScrollToBlueprint={() => scrollToSection('open-rights')}
        />

        {/* 2. Pick Your Club: Per-Match Cost & Big Six Comparison Calculator */}
        <CostCalculator />

        {/* 3. The Full League Inequity Table & Rankings */}
        <ExposureTable />

        {/* 4. The Structural Case for Open Wholesale Rights */}
        <OpenRightsBlueprint />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
