import type { Request, Response } from 'express';
import { recommendTour } from '../mcp-client.ts';

export async function recommendHandler(req: Request, res: Response) {
  try {
    const preferences = req.method === 'POST' ? req.body : req.query;
    
    const recommendation = recommendTour({
      seasonPreference: preferences?.season || preferences?.seasonPreference,
      durationDays: preferences?.durationDays ? Number(preferences.durationDays) : undefined,
      travelStyle: preferences?.travelStyle || preferences?.style,
      solitudeLevel: preferences?.solitudeLevel
    });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      recommendation
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Recommendation engine encountered an unexpected error'
    });
  }
}

export default async function vercelHandler(req: Request, res: Response) {
  return recommendHandler(req, res);
}
