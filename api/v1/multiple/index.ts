import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireApiKey } from "../../../lib/auth.js";
import type {
  SteamStoreAPIResponse,
  SteamStoreGameData,
} from "../../../types/steam.types.js";
import { processData } from "../../../lib/util.js";
import {
  baseUrl,
  CACHE_LIFESPAN,
  CACHE_STALE_REVALIDATE,
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
  const JSONresponse: { data: SteamStoreGameData[] } = { data: [] };

  if (typeof appids === "string") {
    for (const appid of appids.split(",")) {
      const { data }: SteamStoreAPIResponse = await axios.get(
        `${baseUrl}/api/v1/proxy/?appids=${appid}`,
        { headers: { "x-api-key": process.env.PUBLIC_API_KEY } },
      );
      console.log(`fetching ${appid} from steam`);
      if (data[appid]?.success === true) {
        const d = processData(data)[0]!;
        JSONresponse.data.push(d);
      }
    }
  }

  return res.json(JSONresponse);
}
