import type {
  SteamStoreAPIResponse,
  SteamStoreGameData,
  SteamStoreGameItem,
} from "../types/steam.types.js";
import type { SteamSpyGameData } from "../types/steamSpy.types.js";

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
      .replace(/<li>(.*?)(<br\s?\/?>)?<\/li>/g, "- $1\\n")
      .replace(/<br\s?\/?>/g, "\\n")
      .replace(/(\\n)+/g, "\\n")
      .replace(/<\/?(.*?)>/g, "")
      .replace(/&quot;/g, "'");
    this.data = JSON.parse(strippedData);
    return this;
  }

  private static checkRequirementsData(requirements: any) {
    if (requirements === null) return false;
    if (typeof requirements === "undefined") return false;
    if (Array.isArray(requirements) && requirements.length < 1) return false;
    return true;
  }

  public NoRepeatedRequirementsTitles() {
    const reg = /(<strong>)?(Minimum|Recommended):(<\/strong>)?<br\s?\/?>/;
    this.data = {
      ...this.data,
      pc_requirements: ProcessData.checkRequirementsData(
        this.data.pc_requirements,
      )
        ? {
            minimum: this.data.pc_requirements?.minimum?.replace(reg, "") ?? "",
            recommended:
              this.data.pc_requirements?.recommended?.replace(reg, "") ?? "",
          }
        : null,
      mac_requirements: ProcessData.checkRequirementsData(
        this.data.mac_requirements,
      )
        ? {
            minimum:
              this.data.mac_requirements?.minimum?.replace(reg, "") ?? "",
            recommended:
              this.data.mac_requirements?.recommended?.replace(reg, "") ?? "",
          }
        : null,
      linux_requirements: ProcessData.checkRequirementsData(
        this.data.linux_requirements,
      )
        ? {
            minimum:
              this.data.linux_requirements?.minimum?.replace(reg, "") ?? "",
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
        this.data.pc_requirements,
      )
        ? this.data.pc_requirements
        : null,
      mac_requirements: ProcessData.checkRequirementsData(
        this.data.mac_requirements,
      )
        ? this.data.mac_requirements
        : null,
      linux_requirements: ProcessData.checkRequirementsData(
        this.data.linux_requirements,
      )
        ? this.data.linux_requirements
        : null,
    };
    return this;
  }

  public get processedData() {
    return this.data;
  }
}

export function processData(data: SteamStoreGameData[]): SteamStoreGameData[] {
  return Object.values(data).map(
    ({ data }) =>
      new ProcessData(data)
        .fixNonNullRequirements()
        .NoRepeatedRequirementsTitles()
        .disambiguateRequiredAge()
        .stripHTML().processedData,
  ) as unknown as SteamStoreGameData[];
}

export function mapSteampyDataToStoreAPIResponse(
  data: SteamSpyGameData,
): SteamStoreGameItem[] {
  return [
    {
      type: "game",
      name: data.name,
      steam_appid: data.appid,
      required_age: "0",
      is_free: false,
      controller_support: "",
      dlc: [],
      detailed_description: "No description available",
      about_the_game: "No description available",
      short_description: "No description available",
      supported_languages: "English",
      header_image: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${data.appid}/header.jpg?t=1769931675`,
      capsule_image: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${data.appid}/capsule_231x87.jpg?t=1769931675`,
      capsule_imagev5: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${data.appid}/capsule_184x69.jpg?t=1769931675`,
      website: "",
      pc_requirements: {
        minimum: "",
        recommended: "",
      },
      mac_requirements: null,
      linux_requirements: null,
      legal_notice: "",
      developers: [data.developer],
      publishers: [data.publisher],
      demos: [],
      price_overview: {
        currency: "USD",
        initial: data.price ?? 0,
        final: data.price ?? 0,
        discount_percent: 0,
        initial_formatted: data.price
          ? `$${(data.price / 100).toFixed(2)}`
          : "Free",
        final_formatted: data.price
          ? `$${(data.price / 100).toFixed(2)}`
          : "Free",
      },
      packages: [],
      package_groups: [],
      platforms: {
        windows: true,
        mac: false,
        linux: false,
      },
      categories: [],
      genres: [
        {
          id: "1",
          description: data.genre,
        },
      ],
      screenshots: [],
      movies: [],
      recommendations: {
        total: 0,
      },
      achievements: {
        total: 0,
        highlighted: [],
      },
      release_date: {
        coming_soon: false,
        date: "Aug 7, 2025",
      },
      support_info: {
        url: "",
        email: "",
      },
      background: `https://store.akamai.steamstatic.com/images/storepagebackground/app/${data.appid}?t=1769931675`,
      background_raw: `https://store.akamai.steamstatic.com/images/storepagebackground/app/${data.appid}?t=1769931675`,
      content_descriptors: {
        ids: [],
        notes: null,
      },
      ratings: {
        dejus: {
          rating: "",
        },
      },
    },
  ];
}
