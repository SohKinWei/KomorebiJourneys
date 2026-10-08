import React from 'react';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import type { TourPackage } from '../types.ts';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTours: TourPackage[];
  onSelectTour: (tour: TourPackage) => void;
  onRemoveSaved: (tourId: string) => void;
  onClearAll: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedTours,
  onSelectTour,
  onRemoveSaved,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end transition-opacity">
      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l hairline-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="frosted-glass-nav border-b hairline-border px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h3 className="text-sm font-semibold text-[#1c1c1e]">
              Saved Journeys ({savedTours.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {savedTours.length === 0 ? (
            <div className="text-center py-16 text-neutral-400 space-y-3">
              <Bookmark className="w-8 h-8 mx-auto text-neutral-300" />
              <p className="text-sm font-medium text-neutral-600">No journeys saved yet</p>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Click the bookmark icon on any tour card to collect and compare your favorite unusual local journeys.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b hairline-border">
                <span>Selected Itineraries</span>
                <button
                  onClick={onClearAll}
                  className="text-neutral-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>

              {savedTours.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl border hairline-border bg-neutral-50/70 hover:bg-white transition-all space-y-2 group"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={t.heroImage}
                      alt={t.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <span className="text-[10px] text-[#c75135] font-semibold block uppercase">
                        {t.region} · {t.prefecture}
                      </span>
                      <h4 className="font-semibold text-neutral-900 truncate">
                        {t.title}
                      </h4>
                      <div className="text-neutral-500 font-mono text-[11px] tabular-nums mt-0.5">
                        ¥{t.estimatedPriceJpy.toLocaleString()} · {t.durationDays} Days
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t hairline-border text-xs">
                    <button
                      onClick={() => onRemoveSaved(t.id)}
                      className="text-neutral-400 hover:text-rose-600 text-[11px] transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => {
                        onSelectTour(t);
                        onClose();
                      }}
                      className="flex items-center gap-1 font-semibold text-[#1c1c1e] hover:text-[#c75135] transition-colors cursor-pointer"
                    >
                      <span>Open Dossier</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t hairline-border frosted-glass text-center">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
