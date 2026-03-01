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
      .replace(/&quot;/g, "'");
    this.data = JSON.parse(strippedData);
    return this;
  }

  static checkRequirementsData(requirements: any) {
    if (requirements === null) return false;
    if (typeof requirements === "undefined") return false;
    if (Array.isArray(requirements) && requirements.length < 1) return false;
  }

  public NoRepeatedRequirementsTitles() {
    const reg = /(<strong>)?(Minimum|Recommended):(<\/strong>)?<br\s?\/?>/;
    this.data = {
      ...this.data,
      pc_requirements: ProcessData.checkRequirementsData(
        this.data.pc_requirements,
      )
        ? {
            minimum: this.data.pc_requirements?.minimum.replace(reg, "") ?? "",
            recommended:
              this.data.pc_requirements?.recommended?.replace(reg, "") ?? "",
          }
        : null,
      mac_requirements: ProcessData.checkRequirementsData(
        this.data.mac_requirements,
      )
        ? {
            minimum: this.data.mac_requirements?.minimum.replace(reg, "") ?? "",
            recommended:
              this.data.mac_requirements?.recommended?.replace(reg, "") ?? "",
          }
        : null,
      linux_requirements: ProcessData.checkRequirementsData(
        this.data.linux_requirements,
      )
        ? {
            minimum:
              this.data.linux_requirements?.minimum.replace(reg, "") ?? "",
            recommended:
              this.data.linux_requirements?.recommended?.replace(reg, "") ?? "",
          }
        : null,
    };
    return this;
  }

  public fixNonNullRequirements() {
    this.data = {
      ...this.data,
      pc_requirements: ProcessData.checkRequirementsData(
        this.data.mac_requirements,
      )
        ? null
        : this.data.mac_requirements,
      mac_requirements: ProcessData.checkRequirementsData(
        this.data.mac_requirements,
      )
        ? null
        : this.data.mac_requirements,
      linux_requirements: ProcessData.checkRequirementsData(
        this.data.linux_requirements,
      )
        ? null
        : this.data.linux_requirements,
    };
    return this;
  }

  public get processedData() {
    return this.data;
  }
}

export function processData(
  data: SteamStoreAPIResponse["data"],
): SteamStoreGameData[] {
  return Object.values(data).map(
    ({ data }) =>
      new ProcessData(data)
        .fixNonNullRequirements()
        .NoRepeatedRequirementsTitles()
        .disambiguateRequiredAge()
        .stripHTML().processedData,
  ) as unknown as SteamStoreGameData[];
}
