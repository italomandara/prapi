import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireApiKey } from "../../../lib/auth.js";
import type { SteamStoreAPIResponse } from "../../../types/steam.types.js";
import { processData } from "../../../lib/util.js";

const API_ROOT = process.env.API_ROOT;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { appids } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const JSONresponse: SteamStoreAPIResponse | { data: {} } = { data: {} };

  if (typeof appids === "string") {
    for (const appid of appids.split(",")) {
      const { data }: SteamStoreAPIResponse = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${appid}`,
      );
      JSONresponse.data = { ...processData(data) };
    }
  }

  res.json(JSONresponse);
}
