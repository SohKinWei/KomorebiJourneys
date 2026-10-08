/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { TourCard } from './components/TourCard.tsx';
import { TourModal } from './components/TourModal.tsx';
import { McpHealthDrawer } from './components/McpHealthDrawer.tsx';
import { RecommenderModal } from './components/RecommenderModal.tsx';
import { SeasonalCalendar } from './components/SeasonalCalendar.tsx';
import { PhilosophySection } from './components/PhilosophySection.tsx';
import { SavedDrawer } from './components/SavedDrawer.tsx';
import { Footer } from './components/Footer.tsx';
import { Sparkles, Filter, RotateCcw, Compass } from 'lucide-react';
import type { TourPackage, SystemHealthReport } from './types.ts';

export default function App() {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [health, setHealth] = useState<SystemHealthReport | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Modals & Drawers
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [isHealthOpen, setIsHealthOpen] = useState(false);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);

  // Saved / Bookmarked tours (in-memory)
  const [savedTourIds, setSavedTourIds] = useState<string[]>(['iya-valley-seclusion']);

  // Fetch Tours from /api/tours
  const fetchTours = useCallback(async () => {
    setLoadingTours(true);
    try {
      const params = new URLSearchParams();
      if (selectedSeason !== 'all') params.append('season', selectedSeason);
      if (selectedRegion !== 'all') params.append('region', selectedRegion);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/tours?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.tours) {
          setTours(data.tours);
        }
      }
    } catch (err) {
      console.error('Failed to load tours:', err);
    } finally {
      setLoadingTours(false);
    }
  }, [selectedSeason, selectedRegion, searchQuery]);

  // Fetch Health from /api/health
  const fetchHealth = useCallback(async () => {
    setLoadingHealth(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
      }
    } catch (err) {
      console.error('Failed to probe MCP health:', err);
    } finally {
      setLoadingHealth(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  // Toggle Save tour
  const handleToggleSave = (tourId: string) => {
    setSavedTourIds(prev =>
      prev.includes(tourId) ? prev.filter(id => id !== tourId) : [...prev, tourId]
    );
  };

  const handleClearSaved = () => {
    setSavedTourIds([]);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSeason('all');
    setSelectedRegion('all');
  };

  // Find saved objects
  const savedTours = tours.filter(t => savedTourIds.includes(t.id));

  return (
    <div className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d] flex flex-col selection:bg-neutral-900 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenHealth={() => setIsHealthOpen(true)}
        onOpenRecommender={() => setIsRecommenderOpen(true)}
        health={health}
        savedCount={savedTourIds.length}
        onScrollToSection={handleScrollToSection}
        onViewSaved={() => setIsSavedOpen(true)}
      />

      <main className="flex-1">
        {/* Hero & Filter Panel */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          onOpenRecommender={() => setIsRecommenderOpen(true)}
        />

        {/* Tour Packages Grid Section */}
        <section id="tours" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#c75135] uppercase mb-1.5">
                <span>厳選された旅 · CURATED DOSSIERS</span>
                <span aria-hidden="true">·</span>
                <span>Unusual Local Japan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1c1e]">
                Off-the-Beaten-Path Regional Journeys
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-medium text-neutral-800">{tours.length}</span> journeys found
              {(selectedSeason !== 'all' || selectedRegion !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="ml-2 flex items-center gap-1 text-[#c75135] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loadingTours ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-xl border hairline-border bg-white p-4 space-y-4 animate-pulse">
                  <div className="aspect-4/3 bg-neutral-200 rounded-lg" />
                  <div className="h-4 bg-neutral-200 rounded w-1/3" />
                  <div className="h-6 bg-neutral-200 rounded w-3/4" />
                  <div className="h-16 bg-neutral-200 rounded" />
                </div>
              ))}
            </div>
          ) : tours.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 frosted-card rounded-2xl border hairline-border p-8 space-y-4">
              <Compass className="w-10 h-10 text-neutral-300 mx-auto" />
              <h3 className="text-lg font-semibold text-neutral-800">
                No matching unusual journeys found
              </h3>
              <p className="text-sm text-neutral-500 max-w-md mx-auto">
                Try widening your seasonal or regional criteria to explore other remote prefectures.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1c1c1e] hover:bg-black rounded-lg transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Tours Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {tours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onSelect={setSelectedTour}
                  isSaved={savedTourIds.includes(tour.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}
        </section>

        {/* 72 Micro-Seasons Phenological Explorer */}
        <SeasonalCalendar
          tours={tours}
          onSelectTour={setSelectedTour}
        />

        {/* Philosophy & Ma Principles */}
        <PhilosophySection />
      </main>

      {/* Tour Dossier Modal */}
      <TourModal
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
        isSaved={selectedTour ? savedTourIds.includes(selectedTour.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Recommender Questionnaire Modal */}
      <RecommenderModal
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
        onSelectTour={(tour) => {
          setSelectedTour(tour);
          setIsRecommenderOpen(false);
        }}
      />

      {/* MCP Health Telemetry Drawer */}
      <McpHealthDrawer
        isOpen={isHealthOpen}
        onClose={() => setIsHealthOpen(false)}
        health={health}
        isLoading={loadingHealth}
        onRefresh={fetchHealth}
      />

      {/* Saved / Bookmarked Itineraries Drawer */}
      <SavedDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedTours={savedTours}
        onSelectTour={setSelectedTour}
        onRemoveSaved={handleToggleSave}
        onClearAll={handleClearSaved}
      />

      {/* Serene Footer */}
      <Footer
        onOpenHealth={() => setIsHealthOpen(true)}
        onScrollToSection={handleScrollToSection}
      />
    </div>
  );
}
