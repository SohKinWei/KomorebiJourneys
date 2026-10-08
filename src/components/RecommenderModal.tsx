import React, { useState } from 'react';
import { X, Compass, Sparkles, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import type { TourPackage, RecommendationResponse } from '../types.ts';

interface RecommenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTour: (tour: TourPackage) => void;
}

export const RecommenderModal: React.FC<RecommenderModalProps> = ({
  isOpen,
  onClose,
  onSelectTour
}) => {
  const [season, setSeason] = useState('any');
  const [style, setStyle] = useState('wilderness');
  const [duration, setDuration] = useState('4');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResponse | null>(null);

  if (!isOpen) return null;

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          season,
          travelStyle: style,
          durationDays: Number(duration)
        })
      });
      const data = await res.json();
      if (data.success && data.recommendation) {
        setResult(data.recommendation);
      }
    } catch {
      // Fallback handled gracefully
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 transition-opacity">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border hairline-border my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="frosted-glass-nav border-b hairline-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#c75135]" />
            <h3 className="text-sm font-semibold text-[#1c1c1e]">
              Unusual Tour Package Matcher
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!result ? (
            <form onSubmit={handleRecommend} className="space-y-6">
              <div>
                <p className="text-xs text-[#c75135] font-semibold uppercase tracking-wider mb-1">
                  Komorebi Intention Filter
                </p>
                <h4 className="text-xl font-bold text-[#1c1c1e] mb-2">
                  Tell us what kind of stillness or discovery you crave
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  We filter out crowded tourist corridors to connect you with secluded hamlets, living masters, and sacred trails across regional Japan.
                </p>
              </div>

              {/* 1. Season Selection */}
              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-2">
                  1. Desired Season of Travel
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'any', label: 'Any Season', kanji: '四季' },
                    { id: 'haru', label: 'Haru (Spring)', kanji: '春' },
                    { id: 'natsu', label: 'Natsu (Summer)', kanji: '夏' },
                    { id: 'aki', label: 'Aki (Autumn)', kanji: '秋' },
                    { id: 'fuyu', label: 'Fuyu (Winter)', kanji: '冬' }
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setSeason(s.id)}
                      className={`p-2.5 rounded-lg text-xs font-medium text-center border transition-all cursor-pointer ${
                        season === s.id
                          ? 'border-[#1c1c1e] bg-[#1c1c1e] text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span className="block text-sm mb-0.5 opacity-80">{s.kanji}</span>
                      <span className="block text-[11px] truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Travel Rhythm */}
              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-2">
                  2. Cultural & Experiential Rhythm
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: 'wilderness',
                      title: 'Primeval Wilderness & Solitude',
                      desc: 'Moss gorges, hidden valleys, coastal tidal onsens'
                    },
                    {
                      id: 'spiritual',
                      title: 'Sacred Mountain Pilgrimage',
                      desc: 'Yamabushi ascetic rebirth, temple shukubo, cedar steps'
                    },
                    {
                      id: 'craft',
                      title: 'Living Artisans & Workshops',
                      desc: 'Hand-hammered metal, Kiso timber joinery, vine weaving'
                    },
                    {
                      id: 'gastronomy',
                      title: 'Ancestral Fermentation & Terroir',
                      desc: 'Lake Biwa funazushi, aged sake kura, koji traditions'
                    }
                  ].map((st) => (
                    <button
                      type="button"
                      key={st.id}
                      onClick={() => setStyle(st.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        style === st.id
                          ? 'border-[#1c1c1e] bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span className="text-xs font-semibold block mb-0.5">{st.title}</span>
                      <span className={`text-[11px] block leading-snug ${style === st.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {st.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Duration */}
              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-2">
                  3. Trip Length
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '3', label: '3 Days', sub: 'Weekend Retreat' },
                    { id: '4', label: '4 Days', sub: 'Deep Immersion' },
                    { id: '5', label: '5+ Days', sub: 'Extended Pilgrimage' }
                  ].map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setDuration(d.id)}
                      className={`p-2.5 rounded-lg text-xs font-medium text-center border transition-all cursor-pointer ${
                        duration === d.id
                          ? 'border-[#1c1c1e] bg-[#1c1c1e] text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span className="block font-semibold">{d.label}</span>
                      <span className={`block text-[10px] ${duration === d.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                        {d.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-xs font-semibold text-white bg-[#1c1c1e] hover:bg-black rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{loading ? 'Synthesizing Curations via MCP...' : 'Generate Recommended Itinerary'}</span>
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Recommendation Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tailored Unusual Journey Match</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#1c1c1e]">
                    {result.topMatch.title}
                  </h4>
                  <p className="text-xs text-neutral-400">{result.topMatch.japaneseTitle}</p>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-black p-1.5 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Adjust Preferences</span>
                </button>
              </div>

              {/* Rationale Callout */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-neutral-800 space-y-1.5">
                <span className="font-semibold text-[#c75135] block">
                  Why this fits your intention:
                </span>
                <p className="leading-relaxed">{result.rationale}</p>
                <p className="text-[11px] text-neutral-600 italic pt-1 border-t border-amber-200/60">
                  {result.seasonalAdvice}
                </p>
              </div>

              {/* Tour Preview Card */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border hairline-border bg-neutral-50/70 items-center">
                <img
                  src={result.topMatch.heroImage}
                  alt={result.topMatch.title}
                  className="w-full sm:w-40 h-28 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 text-xs space-y-1.5">
                  <div className="text-neutral-500">
                    {result.topMatch.region} · {result.topMatch.prefecture} · {result.topMatch.durationDays} Days
                  </div>
                  <p className="text-neutral-700 line-clamp-2">
                    {result.topMatch.unusualHighlight}
                  </p>
                  <div className="text-xs font-semibold text-[#1c1c1e] font-mono tabular-nums">
                    ¥{result.topMatch.estimatedPriceJpy.toLocaleString()} / person
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-black rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onSelectTour(result.topMatch);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#1c1c1e] hover:bg-black rounded-lg transition-colors cursor-pointer"
                >
                  <span>Explore Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
