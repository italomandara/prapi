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

  public fixPackageGroupsNumberAsString() {
    this.data = {
      ...this.data,
      package_groups: Array.isArray(this.data.package_groups)
        ? this.data.package_groups.map((group) => ({
            ...group,
            display_type: String(group.display_type),
          }))
        : [],
    };
    return this;
  }

  public fixPriceNonInt() {
    this.data = {
      ...this.data,
      price_overview: {
        ...this.data.price_overview,
        initial: Number(this.data.price_overview.initial) || 0,
        final: Number(this.data.price_overview.final) || 0,
      },
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
        .fixPackageGroupsNumberAsString()
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
        initial: Number(data.price) ?? 0,
        final: Number(data.price) ?? 0,
        discount_percent: Number(data.discount) ?? 0,
        initial_formatted: data.price
          ? `$${(Number(data.price) / 100).toFixed(2)}`
          : "Free",
        final_formatted: data.price
          ? `$${(Number(data.price) / 100).toFixed(2)}`
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

import { GoogleGenerativeAI } from "@google/generative-ai";
import { gameSchema } from "../../../schemas/gg.js";

const mock = {
  data: {
    id: "588650",
    is_native: false,
    download_progress: 0.0,
    is_installed: false,
    app_names: [],
    is_custom: false,

    type: "game",
    name: "Dead Cells",
    steam_app_id: 588650,
    required_age: "0",
    is_free: false,
    controller_support: "full",
    dlc: [],

    detailed_description:
      "Dead Cells is a roguelite, metroidvania inspired, action-platformer. You'll explore a sprawling, ever-changing castle... assuming you're able to fight your way past its keepers in 2D souls-lite combat. No checkpoints. Kill, die, learn, repeat.",
    about_the_game:
      "Dead Cells is a roguelite, metroidvania inspired, action-platformer. You'll explore a sprawling, ever-changing castle... assuming you're able to fight your way past its keepers in 2D souls-lite combat. No checkpoints. Kill, die, learn, repeat.",
    short_description:
      "Dead Cells is a roguelite, metroidvania inspired, action-platformer. You'll explore a sprawling, ever-changing castle... assuming you're able to fight your way past its keepers in 2D souls-lite combat. No checkpoints. Kill, die, learn, repeat.",
    supported_languages: null,

    header_image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/header.jpg?t=1772726488",
    capsule_image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/capsule_616x353.jpg",
    capsule_image_v5: null,
    website: null,

    pc_requirements: null,
    mac_requirements: null,
    linux_requirements: null,

    legal_notice: null,
    developers: ["Motion Twin"],
    publishers: ["Motion Twin"],

    price_overview: null,
    packages: [],
    package_groups: [],

    platforms: {
      windows: true,
      mac: true,
      linux: true,
    },

    metacritic: null,

    categories: [
      { id: 2, description: "Single-player" },
      { id: 22, description: "Steam Achievements" },
      { id: 28, description: "Full controller support" },
      { id: 29, description: "Steam Trading Cards" },
      { id: 30, description: "Steam Workshop" },
      { id: 23, description: "Steam Cloud" },
      { id: 41, description: "Remote Play on Phone" },
      { id: 42, description: "Remote Play on Tablet" },
      { id: 43, description: "Remote Play on TV" },
      { id: 62, description: "Family Sharing" },
    ],

    genres: [
      { id: "1", description: "Action" },
      { id: "25", description: "Adventure" },
      { id: "23", description: "Indie" },
    ],

    screenshots: null,
    movies: null,

    recommendations: null,
    achievements: null,

    release_date: {
      coming_soon: false,
      date: "2018-08-06",
    },

    support_info: null,
    background: null,
    background_raw: null,
    content_descriptors: null,
    ratings: null,
  },
};

const genAI = new GoogleGenerativeAI(process.env.AIS_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-3-flash", // High speed, low cost for metadata
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: gameSchema, // Forces structured output
  },
  systemInstruction:
    "You are a specialized game database service. Analyze the provided file path and return the game details in JSON. If a game is not on Steam, return is_custom: true and steam_app_id: 0. Ensure all image URLs are valid public HTTP links.",
});

export async function getGameMetadata(filePath: string) {
  const prompt = `Return the metadata for the game at this path: ${filePath}`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
