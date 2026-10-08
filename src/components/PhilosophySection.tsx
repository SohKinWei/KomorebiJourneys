import React from 'react';
import { Compass, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-16 md:py-24 border-t hairline-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#c75135] uppercase mb-2">
            <span>木漏れ日の哲学 · OUR PRINCIPLES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1c1e] mb-4">
            Travel as Contemplation, Not Consumption
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The Golden Route (Tokyo, Kyoto, Osaka) carries over 75% of inbound visitors to Japan. Komorebi Journeys exists to cultivate reverent, unhurried relationships with the country’s deep interior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Principle 1 */}
          <div className="p-6 rounded-2xl bg-neutral-50/70 border hairline-border space-y-3">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Compass className="w-4 h-4 text-amber-200" />
            </div>
            <h3 className="text-base font-semibold text-[#1c1c1e]">
              01. The Principle of Ma (間)
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We never pack 10 stops into a single day. Each journey builds in intentional silence: listening to the wind through temple cedar tops, gazing at morning unkai mists, and sharing quiet tea with elders.
            </p>
          </div>

          {/* Principle 2 */}
          <div className="p-6 rounded-2xl bg-neutral-50/70 border hairline-border space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#2f5d50] text-white flex items-center justify-center">
              <Feather className="w-4 h-4 text-emerald-200" />
            </div>
            <h3 className="text-base font-semibold text-[#1c1c1e]">
              02. Living Lineages & Apprenticeship
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our hosts are not actors. You sit with 18th-generation funazushi fermenters in Shiga, ordained Yamabushi priests in Dewa Sanzan, and hereditary copper masters in Sado.
            </p>
          </div>

          {/* Principle 3 */}
          <div className="p-6 rounded-2xl bg-neutral-50/70 border hairline-border space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#c75135] text-white flex items-center justify-center">
              <HeartHandshake className="w-4 h-4 text-amber-100" />
            </div>
            <h3 className="text-base font-semibold text-[#1c1c1e]">
              03. Hyper-Local Economic Circularity
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Over 85% of each package fee remains directly inside the host village—supporting thatched-roof preservation, ancient forest stewardship, and the survival of rare regional crafts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
