import { requireApiKey } from "../../lib/auth";

export default async function handler(req, res) {
  // const { success } = await ratelimit.limit(req.headers["x-api-key"]);

  // if (!success) {
  //   return res.status(429).json({ error: "Too many requests" });
  // }

  // if (!requireApiKey(req)) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }

  res.json({ data: "Public API response" });
}
