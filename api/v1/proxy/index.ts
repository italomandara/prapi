import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireApiKey } from "../../../lib/auth.js";
import type { SteamStoreAPIResponse } from "../../../types/steam.types.js";
import {
  CACHE_LIFESPAN,
  CACHE_STALE_REVALIDATE,
  SteamAppInfoEndpoint,
} from "../../../constants.js";
const API_ROOT = process.env.API_ROOT;
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_LIFESPAN} , stale-while-revalidate=${CACHE_STALE_REVALIDATE}`,
  );
  const { appids } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const response: SteamStoreAPIResponse = await axios.get(
    `${SteamAppInfoEndpoint}?appids=${appids}`,
  );

  return res.json(response.data);
}
