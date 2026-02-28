import type {
  SteamStoreAPIResponse,
  SteamStoreGameData,
} from "../types/steam.types.js";

export function disambiguateRequiredAge(
  data: SteamStoreGameData["data"],
): SteamStoreGameData["data"] {
  return {
    ...data,
    required_age: String(data.required_age),
  };
}

export function stripHTML(
  data: SteamStoreGameData["data"],
): SteamStoreGameData["data"] {
  const stringifiedData = JSON.stringify(data);
  const strippedData = stringifiedData
    .replace(/<br\s?\/?>/g, "\\n")
    .replace(/<li>(.*?)<\/li>/g, "- $1\\n")
    .replace(/(\\n)+/g, "\\n")
    .replace(/<\/?(.*?)>/g, "");
  return JSON.parse(strippedData);
}

export function NoRepeatedRequirementsTitles(
  data: SteamStoreGameData["data"],
): SteamStoreGameData["data"] {
  return {
    ...data,
    pc_requirements: {
      minimum: data.pc_requirements?.minimum.replace("Minimum:", "") ?? "",
      recommended:
        data.pc_requirements?.minimum.replace("Recommended:", "") ?? "",
    },
    mac_requirements: {
      minimum: data.mac_requirements?.minimum.replace("Minimum:", "") ?? "",
      recommended:
        data.mac_requirements?.minimum.replace("Recommended:", "") ?? "",
    },
    linux_requirements: {
      minimum: data.linux_requirements?.minimum.replace("Minimum:", "") ?? "",
      recommended:
        data.linux_requirements?.minimum.replace("Recommended:", "") ?? "",
    },
  };
}

export function fixNonNullRequirements(
  data: SteamStoreGameData["data"],
): SteamStoreGameData["data"] {
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
