import axios from "axios";
import { requireApiKey } from "../../lib/auth.js";
import { processData } from "../../lib/util.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { SteamStoreAPIResponse } from "../../types/steam.types.js";
import {
  baseUrl,
  CACHE_LIFESPAN,
  CACHE_STALE_REVALIDATE,
} from "../../constants.js";

const API_ROOT = process.env.API_ROOT;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_LIFESPAN} ', stale-while-revalidate=${CACHE_STALE_REVALIDATE}`,
  );
  const { appid } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { data }: SteamStoreAPIResponse = await axios.get(
    `${baseUrl}/api/v1/proxy/?appids=${appid}`,
    { headers: { "x-api-key": process.env.PUBLIC_API_KEY } },
  );
  if (typeof appid === "string" && data[appid]?.success === true) {
    const JSONresponse = {
      data: processData(data),
    };
    res.json(JSONresponse);
  }
  res.json({
    data: { [appid as string]: [{}] },
  });
}
