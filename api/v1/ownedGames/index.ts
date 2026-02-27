import axios from "axios";
import { requireApiKey } from "../../../lib/auth.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { SteamStoreAPIResponse } from "../../../types/steam.types.js";
import { CACHE_LIFESPAN, CACHE_STALE_REVALIDATE } from "../../../constants.js";

//http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=very_secret&steamid=76561198127577202&format=json

const API_ROOT = process.env.API_ROOT;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_LIFESPAN} , stale-while-revalidate=${CACHE_STALE_REVALIDATE}`,
  );
  const { userid } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { data }: SteamStoreAPIResponse = await axios.get(
    `${process.env.API_ROOT}/IPlayerService/GetOwnedGames/v0001/?key=${
      process.env.PRIVATE_API_KEY
    }&steamid=${userid}`,
  );
  //   if (typeof userid === "string" && data[userid]?.success === true) {
  //     const JSONresponse = {
  //       data,
  //     };
  //     res.json(JSONresponse);
  //   }
  return res.json({
    data,
  });
}
