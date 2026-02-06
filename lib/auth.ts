import type { VercelRequest } from "@vercel/node";

export function requireApiKey(req: VercelRequest) {
  const key = req.headers["x-api-key"];

  if (!key || key !== process.env.PUBLIC_API_KEY) {
    return false;
  }
  return true;
}
