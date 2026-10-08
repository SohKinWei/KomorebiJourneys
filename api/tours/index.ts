import type { Request, Response } from 'express';
import { queryTours, CURATED_TOURS } from '../mcp-client.ts';

export async function toursHandler(req: Request, res: Response) {
  try {
    const season = (req.query.season as string) || 'all';
    const region = (req.query.region as string) || 'all';
    const pace = (req.query.pace as string) || 'all';
    const search = (req.query.search as string) || '';

    const tours = queryTours({ season, region, pace, search });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.status(200).json({
      success: true,
      count: tours.length,
      totalCatalog: CURATED_TOURS.length,
      tours,
      filtersApplied: { season, region, pace, search }
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Unable to retrieve tour catalog'
    });
  }
}

export default async function vercelHandler(req: Request, res: Response) {
  return toursHandler(req, res);
}
