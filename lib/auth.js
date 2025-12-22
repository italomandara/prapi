export function requireApiKey(req) {
  const key = req.headers["x-api-key"];

  if (!key || key !== process.env.PUBLIC_API_KEY) {
    return false;
  }
  return true;
}
