import type {
  SteamStoreAPIResponse,
  SteamStoreGameData,
} from "../types/steam.types.js";

export function disambiguateRequiredAge(
  data: SteamStoreGameData["data"],
): SteamStoreGameData["data"] {
  return data;
  return {
    ...data,
    required_age: String(data.required_age),
  };
}

export function stripHTML(
  data: SteamStoreGameData["data"],
): SteamStoreGameData["data"] {
  return data;
  const stringifiedData = JSON.stringify(data);
  const strippedData = stringifiedData
    .replace(/<br\s?\/?>/g, "\n")
    .replace(/<li>(.*?)<\/li>/g, "- $1\n")
    .replace(/<\/?(.*?)>/g, "");
  return JSON.parse(strippedData);
}

export function fixNonNullRequirements(
  data: SteamStoreGameData["data"],
): SteamStoreGameData["data"] {
  return data;
  return {
    ...data,
    mac_requirements:
      Array.isArray(data.mac_requirements) && data.mac_requirements.length < 1
        ? null
        : data.mac_requirements,
    linux_requirements:
      Array.isArray(data.linux_requirements) &&
      data.linux_requirements.length < 1
        ? null
        : data.linux_requirements,
  };
}

export function processData(
  data: SteamStoreAPIResponse["data"],
): SteamStoreGameData[] {
  return Object.values(data).map(({ data }) =>
    stripHTML(disambiguateRequiredAge(fixNonNullRequirements(data))),
  ) as unknown as SteamStoreGameData[];
}
