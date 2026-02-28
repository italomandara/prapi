import type {
  SteamStoreAPIResponse,
  SteamStoreGameData,
} from "../types/steam.types.js";

class ProcessData {
  private data: SteamStoreGameData["data"];

  constructor(data: SteamStoreGameData["data"]) {
    this.data = data;
  }

  public disambiguateRequiredAge() {
    this.data = {
      ...this.data,
      required_age: String(this.data.required_age),
    };
    return this;
  }

  public stripHTML() {
    const stringifiedData = JSON.stringify(this.data);
    const strippedData = stringifiedData
      .replace(/^<br\s?\/?>/, "")
      .replace(/<br\s?\/?>$/, "")
      .replace(/<br\s?\/?>/g, "\\n")
      .replace(/(\\n)+/g, "\\n")
      .replace(/<li>(.*?)<\/li>/g, "- $1\\n")
      .replace(/<\/?(.*?)>/g, "")
      .replace(/&quot;/g, '"');
    this.data = JSON.parse(strippedData);
    return this;
  }

  public NoRepeatedRequirementsTitles() {
    const reg = /(<strong>)?(Minimum|Recommended):(<\/strong>)?<br\s?\/?>/;
    this.data = {
      ...this.data,
      pc_requirements: {
        minimum: this.data.pc_requirements?.minimum.replace(reg, "") ?? "",
        recommended:
          this.data.pc_requirements?.recommended?.replace(reg, "") ?? "",
      },
      mac_requirements: {
        minimum: this.data.mac_requirements?.minimum.replace(reg, "") ?? "",
        recommended:
          this.data.mac_requirements?.recommended?.replace(reg, "") ?? "",
      },
      linux_requirements: {
        minimum: this.data.linux_requirements?.minimum.replace(reg, "") ?? "",
        recommended:
          this.data.linux_requirements?.recommended?.replace(reg, "") ?? "",
      },
    };
    return this;
  }

  public fixNonNullRequirements() {
    this.data = {
      ...this.data,
      mac_requirements:
        Array.isArray(this.data.mac_requirements) &&
        this.data.mac_requirements.length < 1
          ? null
          : this.data.mac_requirements,
      linux_requirements:
        Array.isArray(this.data.linux_requirements) &&
        this.data.linux_requirements.length < 1
          ? null
          : this.data.linux_requirements,
    };
    return this;
  }

  public get result() {
    return this.data;
  }
}

export function processData(
  data: SteamStoreAPIResponse["data"],
): SteamStoreGameData[] {
  return Object.values(data).map(
    ({ data }) =>
      new ProcessData(data)
        .NoRepeatedRequirementsTitles()
        .fixNonNullRequirements()
        .disambiguateRequiredAge()
        .stripHTML().result,
  ) as unknown as SteamStoreGameData[];
}
