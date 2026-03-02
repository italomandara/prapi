import axios from "axios";
import { requireApiKey } from "../../../lib/auth.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { GetPlayerSummariesResponse } from "../../../types/steam.types.js";
import { CACHE_LIFESPAN, CACHE_STALE_REVALIDATE } from "../../../constants.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_LIFESPAN} , stale-while-revalidate=${CACHE_STALE_REVALIDATE}`,
  );
  const { userid } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const {
    data: {
      response: { players: data },
    },
  }: GetPlayerSummariesResponse = await axios.get(
    `${process.env.API_ROOT}/ISteamUser/GetPlayerSummaries/v0002/?key=${
      process.env.PRIVATE_API_KEY
    }&steamids=${userid}`,
  );
  return res.json({
    data,
  });
}

// http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197960435530&relationship=friend
// http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197972495328
// http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json

// import axios from "axios";
// import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { requireApiKey } from "../../../lib/auth.js";
// import type { SteamStoreAPIResponse } from "../../../types/steam.types.js";
// import {
//   CACHE_LIFESPAN,
//   CACHE_STALE_REVALIDATE,
//   SteamAppInfoEndpoint,
// } from "../../../constants.js";
// const API_ROOT = process.env.API_ROOT;
// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   res.setHeader(
//     "Cache-Control",
//     `public, s-maxage=${CACHE_LIFESPAN} ', stale-while-revalidate=${CACHE_STALE_REVALIDATE}`,
//   );
//   const { appid } = req.query;
//   if (!requireApiKey(req)) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const { data }: SteamStoreAPIResponse = await axios.get(
//     `${SteamAppInfoEndpoint}?appids=${appid}`,
//   );

//   return res.json({
//     data: Object.values(data).map(({ data }) => data),
//   });
// }
