import axios from "axios";
import { requireApiKey } from "../../lib/auth.js";
import {
  mapSteampyDataToStoreAPIResponse,
  processData,
} from "../../lib/util.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { SteamStoreAPIResponse } from "../../types/steam.types.js";
import {
  CACHE_LIFESPAN,
  CACHE_STALE_REVALIDATE,
  SteamAppInfoEndpoint,
} from "../../constants.js";
import type { SteamSpyGameData } from "../../types/steamSpy.types.js";

const API_ROOT = process.env.API_ROOT;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_LIFESPAN} , stale-while-revalidate=${CACHE_STALE_REVALIDATE}`,
  );
  const { appid } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { data }: SteamStoreAPIResponse = await axios.get(
    `${SteamAppInfoEndpoint}?appids=${appid}`,
  );
  if (typeof appid === "string" && data[appid]?.success === true) {
    const JSONresponse = {
      data: processData(data),
    };
    return res.json(JSONresponse);
  } else {
    const { data }: { data: SteamSpyGameData } = await axios.get(
      `https://steamspy.com/api.php?request=appdetails&appid=${appid}`,
    );
    if (data.name) {
      return res.json({
        data: mapSteampyDataToStoreAPIResponse(data),
      });
    } else {
      return res.json({
        data: [],
      });
    }
  }
}

//https://steamspy.com/api.php?request=appdetails&appid={id}

// http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197972495328
