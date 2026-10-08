import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Users, Sparkles, Utensils, Award, Compass, Send, CheckCircle2, Bookmark, Printer } from 'lucide-react';
import type { TourPackage } from '../types.ts';

interface TourModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (tourId: string) => void;
}

export const TourModal: React.FC<TourModalProps> = ({
  tour,
  onClose,
  isSaved,
  onToggleSave
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!tour) return null;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setInquirySubmitted(true);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border hairline-border my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 frosted-glass-nav border-b hairline-border px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500 truncate mr-3">
            <span>{tour.prefecture}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{tour.japaneseTitle}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(tour.id)}
              className={`p-1.5 rounded-md border hairline-border transition-colors cursor-pointer ${
                isSaved ? 'bg-amber-500 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
              title={isSaved ? 'Saved in collection' : 'Save to collection'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-md border hairline-border text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Print / Save Dossier"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          {/* Header Banner & Titles */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#c75135] mb-2 uppercase tracking-wider">
              <span>{tour.seasonKanji}</span>
              <span aria-hidden="true">·</span>
              <span>{tour.solarTerm}</span>
              <span aria-hidden="true">·</span>
              <span className="italic">{tour.microSeason}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1c1e] tracking-tight mb-2">
              {tour.title}
            </h2>
            <p className="text-sm font-medium text-neutral-400 mb-4 tracking-wide">
              {tour.japaneseTitle}
            </p>
            <p className="text-base text-neutral-700 leading-relaxed max-w-3xl">
              {tour.description}
            </p>
          </div>

          {/* Hero Visual Card */}
          <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-neutral-100 border hairline-border">
            <img
              src={tour.heroImage}
              alt={tour.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex flex-wrap items-center justify-between gap-2">
              <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-md">
                Best Window: {tour.bestMonths.join(' & ')}
              </span>
              <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-md font-mono tabular-nums">
                Est. ¥{tour.estimatedPriceJpy.toLocaleString()} / person
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar (Zero-pill discipline, cleanly spaced) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y hairline-border text-xs">
            <div>
              <span className="text-neutral-400 block mb-0.5">Duration</span>
              <span className="font-semibold text-neutral-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                {tour.durationDays} Days / {tour.durationDays - 1} Nights
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-0.5">Pace & Style</span>
              <span className="font-semibold text-neutral-800 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-neutral-500" />
                {tour.pace}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-0.5">Party Size</span>
              <span className="font-semibold text-neutral-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-neutral-500" />
                Max {tour.maxGroupSize} Travelers
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-0.5">Region</span>
              <span className="font-semibold text-neutral-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                {tour.region} ({tour.prefecture})
              </span>
            </div>
          </div>

          {/* The Unusual Factor Callout */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#c75135] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[#1c1c1e] mb-1">
                  Why This Tour is Truly Unusual
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {tour.unusualHighlight}
                </p>
                <div className="mt-2 text-xs text-[#c75135] font-medium">
                  ✦ Komorebi Secret: {tour.insiderSecret}
                </div>
              </div>
            </div>
          </div>

          {/* Day-by-Day Detailed Itinerary */}
          <div>
            <h3 className="text-lg font-semibold text-[#1c1c1e] mb-4">
              Day-by-Day Journey Itinerary
            </h3>
            <div className="space-y-4">
              {tour.itinerary.map((dayItem) => (
                <div 
                  key={dayItem.day} 
                  className="p-4 rounded-xl border hairline-border bg-neutral-50/60 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#c75135] mb-1">
                    <span>Day 0{dayItem.day}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-neutral-700">{dayItem.focus}</span>
                  </div>
                  <h4 className="text-base font-semibold text-[#1c1c1e] mb-1.5">
                    {dayItem.title}
                  </h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {dayItem.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Artisan & Culinary Twin Spotlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Artisan Host */}
            <div className="p-4 rounded-xl border hairline-border bg-neutral-50/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-[#2f5d50]" />
                <span>Featured Local Host</span>
              </div>
              <h5 className="text-sm font-semibold text-[#1c1c1e]">
                {tour.artisanMaster.name}
              </h5>
              <p className="text-xs text-[#2f5d50] font-medium mb-1.5">
                {tour.artisanMaster.discipline}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {tour.artisanMaster.heritage}
              </p>
            </div>

            {/* Culinary Tradition */}
            <div className="p-4 rounded-xl border hairline-border bg-neutral-50/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                <Utensils className="w-4 h-4 text-[#c75135]" />
                <span>Ancestral Culinary Tradition</span>
              </div>
              <h5 className="text-sm font-semibold text-[#1c1c1e]">
                {tour.culinaryTradition.dish}
              </h5>
              <p className="text-xs text-neutral-600 leading-relaxed mt-1">
                {tour.culinaryTradition.description}
              </p>
            </div>
          </div>

          {/* Access & Logistics */}
          <div className="p-4 rounded-xl border hairline-border bg-neutral-100/50 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-800 block mb-1">
              Rural Access Route & Arrival Directions
            </span>
            <p className="leading-relaxed">{tour.accessRoute}</p>
          </div>

          {/* Booking Inquiry Section */}
          <div className="pt-4 border-t hairline-border">
            <h3 className="text-lg font-semibold text-[#1c1c1e] mb-1">
              Inquire Regarding Dates & Small-Group Departure
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Due to fragile heritage locations and direct master apprenticeships, departures are limited to {tour.maxGroupSize} guests.
            </p>

            {inquirySubmitted ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Inquiry Dispatched to Local Host Network</h4>
                  <p className="text-xs leading-relaxed text-emerald-800">
                    Thank you, {inquiryName}. Our regional coordinator in {tour.prefecture} will review season availability and reach out to {inquiryEmail} within 24 hours with confirmed itinerary dates.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Kenji Tanaka"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border hairline-border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border hairline-border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                      Target Window / Season
                    </label>
                    <input
                      type="text"
                      value={inquiryDate}
                      onChange={(e) => setInquiryDate(e.target.value)}
                      placeholder={`Ideal: ${tour.bestMonths.join(', ')}`}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border hairline-border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                      Traveler Notes & Dietary Needs
                    </label>
                    <input
                      type="text"
                      value={inquiryNotes}
                      onChange={(e) => setInquiryNotes(e.target.value)}
                      placeholder="Special interests, dietary restrictions..."
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border hairline-border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#1c1c1e] hover:bg-black rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Submit Journey Reservation Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
