import React from 'react';
import { Activity } from 'lucide-react';

interface FooterProps {
  onOpenHealth: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenHealth,
  onScrollToSection
}) => {
  return (
    <footer className="border-t hairline-border bg-white text-xs text-neutral-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b hairline-border">
          <div>
            <span className="text-base font-semibold text-[#1c1c1e] block mb-1">
              Komorebi Journeys
            </span>
            <p className="text-xs text-neutral-400 max-w-sm">
              Authentic recommendations for unusual, off-the-beaten-path local tour packages in Japan, inspired by *komorebi* (sunlight filtering through trees) and *ma* (reverent negative space).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600 font-medium">
            <button
              onClick={() => onScrollToSection('tours')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Tour Packages
            </button>
            <button
              onClick={() => onScrollToSection('seasons')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              72 Micro-Seasons
            </button>
            <button
              onClick={() => onScrollToSection('philosophy')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Our Philosophy
            </button>
            <button
              onClick={onOpenHealth}
              className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer text-[#c75135]"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>MCP Health Check (/api/health)</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            Data sourced via Model Context Protocol:
            <span className="text-neutral-600 ml-1">sohkinwei MCP</span> &amp;
            <span className="text-neutral-600 ml-1">Japan in Seasons MCP</span>.
          </div>
          <div className="flex items-center gap-4">
            <span>Server Proxy Active in <code className="font-mono text-neutral-600">api/</code></span>
            <span aria-hidden="true">·</span>
            <span>No Browser MCP Calls</span>
            <span aria-hidden="true">·</span>
            <span>Zero Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
