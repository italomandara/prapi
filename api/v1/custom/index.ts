import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGoogleGameMetadata, getGameMetadata } from "../../../lib/util.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (typeof req.body.hints !== "string") {
    return res.status(400).json({ error: "Missing hints in request body" });
  }

  if (req.body.api === "groq") {
    const data = await getGameMetadata(req.body.hints);
    return res.status(200).json({ data });
  }

  const data = await getGoogleGameMetadata(req.body.hints);
  return res.status(200).json({ data });
}
