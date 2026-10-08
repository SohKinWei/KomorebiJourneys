import React from 'react';
import { Activity, Compass, Bookmark } from 'lucide-react';
import type { SystemHealthReport } from '../types.ts';

interface NavbarProps {
  onOpenHealth: () => void;
  onOpenRecommender: () => void;
  health: SystemHealthReport | null;
  savedCount: number;
  onScrollToSection: (sectionId: string) => void;
  onViewSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHealth,
  onOpenRecommender,
  health,
  savedCount,
  onScrollToSection,
  onViewSaved
}) => {
  const isHealthy = health?.overallStatus === 'healthy';
  const isFallback = health?.overallStatus === 'operational_fallback';

  return (
    <header className="sticky top-0 z-40 w-full frosted-glass-nav border-b hairline-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Zone (Single clean wordmark) */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onScrollToSection('hero'); }}
          className="text-lg font-semibold tracking-tight text-[#1c1c1e] hover:opacity-85 transition-opacity"
        >
          Komorebi Journeys
        </a>

        {/* Zone 2: 4-5 Navigation Links (Clean single-line links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onScrollToSection('tours')}
            className="hover:text-[#1c1c1e] transition-colors cursor-pointer"
          >
            Journeys
          </button>
          <button
            onClick={() => onScrollToSection('seasons')}
            className="hover:text-[#1c1c1e] transition-colors cursor-pointer"
          >
            72 Micro-Seasons
          </button>
          <button
            onClick={() => onScrollToSection('philosophy')}
            className="hover:text-[#1c1c1e] transition-colors cursor-pointer"
          >
            Philosophy
          </button>
          <button
            onClick={onViewSaved}
            className="flex items-center gap-1.5 hover:text-[#1c1c1e] transition-colors cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedCount})</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          {/* MCP Health Affordance */}
          <button
            onClick={onOpenHealth}
            title="Inspect server-side MCP connection health (Japan in Seasons & sohkinwei)"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100/90 hover:bg-neutral-200/90 rounded-md transition-colors cursor-pointer border hairline-border"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isHealthy
                  ? 'bg-emerald-500 ring-2 ring-emerald-200'
                  : isFallback
                  ? 'bg-amber-500 ring-2 ring-amber-200'
                  : 'bg-rose-500 ring-2 ring-rose-200'
              }`}
            />
            <Activity className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">MCP Network</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenRecommender}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#1c1c1e] hover:bg-black rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Curate Journey</span>
          </button>
        </div>
      </div>
    </header>
  );
};
