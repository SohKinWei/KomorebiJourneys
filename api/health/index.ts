import type { Request, Response } from 'express';
import { checkMcpHealth } from '../mcp-client.ts';

/**
 * Health check handler for MCP endpoints:
 * 1. Japan in Seasons (https://seasons.kooexperience.com/mcp)
 * 2. sohkinwei (https://mcp.smithery.ai/sohkinwei)
 *
 * Can be used by Express server or exported as Vercel serverless function.
 */
export async function healthHandler(_req: Request, res: Response) {
  try {
    const health = await checkMcpHealth();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(health);
  } catch {
    return res.status(500).json({
      overallStatus: 'degraded',
      timestamp: new Date().toISOString(),
      error: 'Health evaluation encountered an internal error'
    });
  }
}

// Default export for Vercel Serverless function support
export default async function vercelHandler(req: Request, res: Response) {
  return healthHandler(req, res);
}
