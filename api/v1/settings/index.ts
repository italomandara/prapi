import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireApiKey } from "../../../lib/auth.js";
import {
  CACHE_LIFESPAN,
  CACHE_STALE_REVALIDATE,
  gameSettings,
} from "../../../constants.js";
const API_ROOT = process.env.API_ROOT;
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_LIFESPAN} , stale-while-revalidate=${CACHE_STALE_REVALIDATE}`,
  );
  const { SteamID } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const response = gameSettings[SteamID as keyof typeof gameSettings];

  return res.json(response);
}
