import React, { useState } from 'react';
import { Calendar, CloudSun, Leaf, Wind, Snowflake, ArrowRight } from 'lucide-react';
import type { TourPackage } from '../types.ts';

interface SeasonalCalendarProps {
  tours: TourPackage[];
  onSelectTour: (tour: TourPackage) => void;
}

export const SeasonalCalendar: React.FC<SeasonalCalendarProps> = ({
  tours,
  onSelectTour
}) => {
  const [activeSeason, setActiveSeason] = useState<'Haru' | 'Natsu' | 'Aki' | 'Fuyu'>('Aki');

  const seasonsData = [
    {
      key: 'Haru' as const,
      name: 'Haru · Spring',
      kanji: '春',
      accentColor: '#e28b9b',
      icon: Leaf,
      climate: 'Mountain snowmelt, wild mountain sansai herbs, first green tea shoots.',
      solarTerms: ['Risshun (Spring Begins)', 'Keichitsu (Insects Awaken)', 'Shunbun (Spring Equinox)', 'Kokuu (Grain Rain)'],
      unusualPhenomena: 'Ancient cherry blossoms at remote temple mountain terraces; awakening of moss spores in Yakushima forests.'
    },
    {
      key: 'Natsu' as const,
      name: 'Natsu · Summer',
      kanji: '夏',
      accentColor: '#2f5d50',
      icon: CloudSun,
      climate: 'Cool alpine ridges, fireflies along secluded river gorges, cedar shade.',
      solarTerms: ['Rikka (Summer Begins)', 'Geshi (Summer Solstice)', 'Taisho (Great Heat)'],
      unusualPhenomena: 'Yamabushi mountain ascetic rituals across Dewa Sanzan; sacred waterfall purification (takigyo).'
    },
    {
      key: 'Aki' as const,
      name: 'Aki · Autumn',
      kanji: '秋',
      accentColor: '#c75135',
      icon: Wind,
      climate: 'Golden mountain rice paddies, sea of clouds (unkai), sweet persimmons and wild chestnuts.',
      solarTerms: ['Risshu (Autumn Begins)', 'Shubun (Autumn Equinox)', 'Kanro (Cold Dew)', 'Soko (Frost Falls)'],
      unusualPhenomena: 'Morning mists filling Shikoku’s Iya Valley; harvest of heirloom buckwheat and autumn lacquer tapping.'
    },
    {
      key: 'Fuyu' as const,
      name: 'Fuyu · Winter',
      kanji: '冬',
      accentColor: '#3c4b64',
      icon: Snowflake,
      climate: 'Heavy snow silence in northern passes, hot geothermal mineral baths, winter sake brewing.',
      solarTerms: ['Ritto (Winter Begins)', 'Shosetsu (Lesser Snow)', 'Toji (Winter Solstice)', 'Daikan (Greater Cold)'],
      unusualPhenomena: 'Post-towns of the Nakasendo glow under hand-lit snow lanterns; centuries-old lactic fermentation of funazushi at Lake Biwa.'
    }
  ];

  const currentData = seasonsData.find(s => s.key === activeSeason)!;
  const matchingTours = tours.filter(t => t.season === activeSeason || t.season === 'All Seasons');

  return (
    <section id="seasons" className="py-16 md:py-24 border-t hairline-border bg-[#f3f3f5]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#c75135] uppercase mb-2">
            <span>七十二候 · 72 MICRO-SEASONS</span>
            <span aria-hidden="true">·</span>
            <span>Japan in Seasons MCP Data</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1c1e] mb-3">
            Journeys Tuned to Japan’s Ancient Solar Calendar
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Rather than standard quarterly seasons, traditional Japanese culture recognizes 24 solar terms (*Sekki*) and 72 micro-seasons (*Kō*), each capturing fleeting shifts in mist, soil scents, and bird calls.
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {seasonsData.map((s) => {
            const Icon = s.icon;
            const isSelected = activeSeason === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveSeason(s.key)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#1c1c1e] shadow-xs'
                    : 'bg-white/60 border-neutral-200/80 hover:bg-white text-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-[#1c1c1e] font-serif">{s.kanji}</span>
                  <Icon className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="text-xs font-semibold text-[#1c1c1e]">{s.name}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Season Detailed Panel */}
        <div className="frosted-card rounded-2xl p-6 sm:p-8 border hairline-border mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#c75135] uppercase tracking-wider block mb-1">
                  Phenological Climate
                </span>
                <p className="text-sm text-neutral-800 leading-relaxed font-normal">
                  {currentData.climate}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                  Unusual Nature Phenomenon
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {currentData.unusualPhenomena}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
                  Associated Solar Terms (Sekki)
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs text-neutral-600">
                  {currentData.solarTerms.map((term, i) => (
                    <span key={i} className="bg-neutral-100 px-2 py-0.5 rounded text-[11px]">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Matched Tours for this Season */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider block mb-2">
                Recommended Tours for {currentData.name} ({matchingTours.length})
              </span>

              <div className="space-y-3">
                {matchingTours.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => onSelectTour(t)}
                    className="p-4 rounded-xl bg-white border hairline-border hover:border-[#1c1c1e] transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#c75135] font-medium mb-1">
                        <span>{t.prefecture}</span>
                        <span aria-hidden="true">·</span>
                        <span>{t.solarTerm}</span>
                        <span aria-hidden="true">·</span>
                        <span className="italic">{t.microSeason}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#1c1c1e] group-hover:text-[#c75135] transition-colors">
                        {t.title}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                        {t.unusualHighlight}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <span className="text-xs font-mono font-semibold text-neutral-800 tabular-nums">
                        ¥{t.estimatedPriceJpy.toLocaleString()}
                      </span>
                      <div className="p-1.5 rounded-md bg-neutral-100 group-hover:bg-[#1c1c1e] group-hover:text-white transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
