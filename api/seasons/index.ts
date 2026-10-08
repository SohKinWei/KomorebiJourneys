import type { Request, Response } from 'express';
import { fetchJapanSeasonsLiveAnswer } from '../mcp-client.ts';

export async function seasonsHandler(req: Request, res: Response) {
  try {
    const question = (req.body?.question || req.query.question as string || 'What is the current autumn foliage and seasonal travel advice for regional Japan?').trim();
    const startDate = req.body?.startDate || req.query.startDate as string || undefined;

    const result = await fetchJapanSeasonsLiveAnswer(question, startDate);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache 5 min
    return res.status(200).json(result);
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Unable to query seasonal travel MCP endpoint'
    });
  }
}

export default async function vercelHandler(req: Request, res: Response) {
  return seasonsHandler(req, res);
}
