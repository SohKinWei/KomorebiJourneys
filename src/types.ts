export interface McpEndpointHealth {
  name: string;
  url: string;
  status: 'healthy' | 'accessible' | 'unauthorized' | 'degraded' | 'offline';
  httpStatus: number | null;
  latencyMs: number;
  lastChecked: string;
  notes: string;
}

export interface SystemHealthReport {
  overallStatus: 'healthy' | 'operational_fallback' | 'degraded' | 'offline';
  timestamp: string;
  endpoints: McpEndpointHealth[];
  mcpEnabled: boolean;
  activeCurationsCount: number;
}

export interface TourPackage {
  id: string;
  title: string;
  japaneseTitle: string;
  tagline: string;
  region: 'Tohoku' | 'Shikoku' | 'Hokuriku' | 'Kyushu' | 'Kansai Rural' | 'Chubu';
  prefecture: string;
  season: 'Haru' | 'Natsu' | 'Aki' | 'Fuyu' | 'All Seasons';
  seasonKanji: string;
  bestMonths: string[];
  solarTerm: string;
  microSeason: string;
  durationDays: number;
  pace: 'Contemplative' | 'Moderate' | 'Active Exploration';
  unusualHighlight: string;
  description: string;
  heroImage: string;
  gallery: string[];
  itinerary: {
    day: number;
    title: string;
    focus: string;
    details: string;
  }[];
  insiderSecret: string;
  artisanMaster: {
    name: string;
    discipline: string;
    heritage: string;
  };
  culinaryTradition: {
    dish: string;
    description: string;
  };
  accessRoute: string;
  estimatedPriceJpy: number;
  maxGroupSize: number;
  suitability: string[];
}

export interface RecommendationResponse {
  topMatch: TourPackage;
  alternativeMatches: TourPackage[];
  rationale: string;
  seasonalAdvice: string;
}
