import axios from "axios";
import { requireApiKey } from "../../lib/auth.js";
import { processData } from "../../lib/util.js";
// import { ratelimit } from "../../lib/rateLimit.js";
const API_ROOT = process.env.API_ROOT;
export default async function handler(req, res) {
  // const { success } = await ratelimit.limit(req.headers["x-api-key"]);

  // if (!success) {
  //   return res.status(429).json({ error: "Too many requests" });
  // }
  const {
    appid,
    // count,
    // maxlength = 300
  } = req.query;
  if (!requireApiKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { data } = await axios.get(
    `https://store.steampowered.com/api/appdetails?appids=${appid}`,
  );
  // const { data } = await axios.get(
  //   `${process.env.API_ROOT}?key=${process.env.PRIVATE_API_KEY}&appid=${appid}&count=${count}&maxlength=${maxlength}&format=json`,
  // );
  const JSONresponse = {
    data: processData(data),
  };
  res.json(JSONresponse);
}
