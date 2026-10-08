import React from 'react';
import { Search, MapPin, Calendar, Compass } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  onOpenRecommender: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedSeason,
  onSeasonChange,
  selectedRegion,
  onRegionChange,
  onOpenRecommender
}) => {
  const seasons = [
    { id: 'all', label: 'All Seasons', kanji: '四季' },
    { id: 'haru', label: 'Haru · Spring', kanji: '春' },
    { id: 'natsu', label: 'Natsu · Summer', kanji: '夏' },
    { id: 'aki', label: 'Aki · Autumn', kanji: '秋' },
    { id: 'fuyu', label: 'Fuyu · Winter', kanji: '冬' }
  ];

  const regions = [
    { id: 'all', label: 'All Regions' },
    { id: 'shikoku', label: 'Shikoku (Tokushima)' },
    { id: 'tohoku', label: 'Tohoku (Yamagata)' },
    { id: 'kyushu', label: 'Kyushu (Yakushima)' },
    { id: 'kansai_rural', label: 'Kansai Rural (Shiga / Lake Biwa)' },
    { id: 'chubu', label: 'Chubu (Kiso Valley)' },
    { id: 'hokuriku', label: 'Hokuriku (Sado & Noto)' }
  ];

  return (
    <section id="hero" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Visual Container */}
        <div className="relative rounded-2xl overflow-hidden border hairline-border shadow-xs bg-neutral-900 aspect-16/9 md:aspect-21/9 max-h-[520px]">
          <img
            src="/src/assets/images/hero_komorebi_forest_1791434621943.jpg"
            alt="Ancient misty Japanese cedar path dappled with sunlight (Komorebi)"
            className="w-full h-full object-cover object-center opacity-85 hover:scale-102 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient scrim for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          {/* Hero Typography Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-200/90 mb-3">
                <span>木漏れ日</span>
                <span aria-hidden="true">·</span>
                <span>Unusual Local Tour Packages in Japan</span>
                <span aria-hidden="true">·</span>
                <span className="hidden sm:inline">Smithery MCP Data Engine</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                Quiet Paths Beyond the Golden Route
              </h1>

              <p className="text-base sm:text-lg text-neutral-200 font-normal leading-relaxed max-w-2xl mb-6">
                Discover secluded mountain hermitages, ancient fermentation masters, and moss-carpeted island rainforests—unhurried journeys tuned to Japan’s 72 micro-seasons.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenRecommender}
                  className="px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-neutral-100 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#c75135]" />
                  <span>Match My Ideal Journey</span>
                </button>
                <a
                  href="#tours"
                  className="px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg transition-colors"
                >
                  Explore All Curated Itineraries
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Search & Filter Bar */}
        <div className="mt-8 p-4 sm:p-5 frosted-card rounded-xl shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by valley, artisan, craft, or temple..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-neutral-50/80 border hairline-border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1c1c1e] text-neutral-800 placeholder-neutral-400"
              />
            </div>

            {/* Region Dropdown */}
            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-neutral-50/80 border hairline-border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1c1c1e] text-neutral-800 appearance-none cursor-pointer"
              >
                {regions.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {reg.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Season Filter Segmented Control */}
            <div className="md:col-span-5 flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              <Calendar className="w-4 h-4 text-neutral-400 mr-1 shrink-0 hidden sm:inline" />
              {seasons.map((season) => {
                const isActive = selectedSeason === season.id;
                return (
                  <button
                    key={season.id}
                    onClick={() => onSeasonChange(season.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#1c1c1e] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="opacity-75 mr-1">{season.kanji}</span>
                    <span>{season.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
