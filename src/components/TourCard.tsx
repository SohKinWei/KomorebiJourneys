import React from 'react';
import { Bookmark, Sparkles, Clock, ArrowRight, UserCheck } from 'lucide-react';
import type { TourPackage } from '../types.ts';

interface TourCardProps {
  tour: TourPackage;
  onSelect: (tour: TourPackage) => void;
  isSaved: boolean;
  onToggleSave: (tourId: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  onSelect,
  isSaved,
  onToggleSave
}) => {
  return (
    <article className="group flex flex-col frosted-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border hairline-border">
      {/* Visual Header */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        <img
          src={tour.heroImage}
          alt={tour.title}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to secondary image
            e.currentTarget.src = '/src/assets/images/hero_komorebi_forest_1791434621943.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Season & Prefecture Badges (Clean, non-pill text) */}
        <div className="absolute top-3 left-3 text-xs font-medium text-white/95 drop-shadow-sm flex items-center gap-1.5">
          <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
            {tour.seasonKanji}
          </span>
          <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
            {tour.prefecture}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(tour.id);
          }}
          aria-label={isSaved ? 'Remove from saved' : 'Save journey'}
          className={`absolute top-3 right-3 p-1.5 rounded-md backdrop-blur-md transition-colors cursor-pointer ${
            isSaved
              ? 'bg-amber-500 text-white'
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Floating duration on image bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{tour.durationDays} Days / {tour.durationDays - 1} Nights</span>
          </span>
          <span className="italic text-neutral-300 text-[11px] truncate max-w-[160px]">
            {tour.solarTerm}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata String: Zero-pill discipline */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2 font-normal">
            <span>{tour.region}</span>
            <span aria-hidden="true">·</span>
            <span>{tour.pace}</span>
            <span aria-hidden="true">·</span>
            <span>Max {tour.maxGroupSize} guests</span>
          </div>

          {/* Kanji Japanese Subtitle */}
          <p className="text-xs font-medium text-neutral-400 tracking-wider mb-1">
            {tour.japaneseTitle}
          </p>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[#1c1c1e] group-hover:text-[#c75135] transition-colors leading-snug mb-2">
            {tour.title}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
            {tour.tagline}
          </p>

          {/* Why It's Unusual Box */}
          <div className="p-3 rounded-lg bg-neutral-50/90 border hairline-border mb-4">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#c75135] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-semibold text-[#1c1c1e] tracking-tight uppercase mb-0.5">
                  The Unusual Factor
                </p>
                <p className="text-xs text-neutral-600 leading-normal line-clamp-2">
                  {tour.unusualHighlight}
                </p>
              </div>
            </div>
          </div>

          {/* Artisan & Host Mention */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
            <UserCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">
              Host: <strong className="text-neutral-700 font-medium">{tour.artisanMaster.name}</strong> ({tour.artisanMaster.discipline})
            </span>
          </div>
        </div>

        {/* Footer Area with Price and CTA */}
        <div className="pt-3 border-t hairline-border flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] text-neutral-400 block">From</span>
            <span className="text-base font-semibold text-[#1c1c1e] font-mono tabular-nums">
              ¥{tour.estimatedPriceJpy.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-500 ml-1">/ person</span>
          </div>

          <button
            onClick={() => onSelect(tour)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#1c1c1e] hover:text-white bg-neutral-100 hover:bg-[#1c1c1e] rounded-md transition-all cursor-pointer"
          >
            <span>View Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
