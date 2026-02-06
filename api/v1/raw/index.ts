import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireApiKey } from "../../../lib/auth.js";
import type { SteamStoreAPIResponse } from "../../../types/steam.types.js";
const API_ROOT = process.env.API_ROOT;
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { appid } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data }: SteamStoreAPIResponse = await axios.get(
    `https://store.steampowered.com/api/appdetails?appids=${appid}`,
  );

  res.json({
    data: Object.values(data).map(({ data }) => data),
  });
}
