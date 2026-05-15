import type {
  SteamStoreAPIResponse,
  SteamStoreGameData,
  SteamStoreGameItem,
} from "../types/steam.types.js";
import type { SteamSpyGameData } from "../types/steamSpy.types.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { gameSchema } from "../schemas/gg.js";

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

const mock = {
  id: "0",
  is_native: false,
  download_progress: 100,
  is_installed: true,
  app_names: [],
  is_custom: true,

  type: "game",
  name: "Game Name",
  steam_app_id: 0,
  required_age: "0",
  is_free: false,
  controller_support: "full",
  dlc: [],

  detailed_description: "",
  about_the_game: "",
  short_description: "",
  supported_languages: null,

  header_image: "",
  capsule_image: "",
  capsule_image_v5: null,
  website: null,

  pc_requirements: null,
  mac_requirements: null,
  linux_requirements: null,

  legal_notice: null,
  developers: ["Developer"],
  publishers: ["Publisher"],

  price_overview: null,
  packages: [],
  package_groups: [],

  platforms: {
    windows: true,
    mac: true,
    linux: true,
  },

  metacritic: null,

  categories: [{ id: 2, description: "Single-player" }],

  genres: [{ id: "1", description: "Action" }],

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
};

const genAI = new GoogleGenerativeAI(process.env.AIS_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview", // High speed, low cost for metadata
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: gameSchema as any, // Forces structured output
  },
  systemInstruction: `
You are a video game expert and researcher. Your job is to analyze a file path, identify the video game it belongs to, find an appropriate header image, and return structured data.

### Step 1 — Identify the Game
- Analyze the file path carefully: folder names, file names, abbreviations, and extensions are all clues.
- If the path contains ambiguous names, reason through the most likely match based on naming conventions used by game developers, launchers (Steam, Epic, GOG), or ROM naming standards.

### Step 3 — Build the phase 1 JSON without the header image URL

### Step 2 — Find the Header Image
- Search on the web for the identified game, using the game name from the JSON followed by "game header image or banner" and keep 5 results.
- From results prefer official landscape-oriented header image for the identified game.
- Prefer images from any game database and not official websites.
- Prefer sources like: Steam store banners (460×215 or 920×430).
- Analyze images and prefer images that have the game title inside in the image.
- The image must be: landscape orientation, and clearly associated with the game.
- Provide the direct image URL, make sure the image link is valid and accessible.

### Step 4 — Add the header image to the JSON unsing the key "header_image" and return the complete JSON with all metadata and the header image URL.
`,
});

export async function getGameMetadata(hints: string) {
  const prompt = `Return the metadata for the game at this path: ${hints}`;
  const result = await model.generateContent(prompt);
  const gameData = JSON.parse(result.response.text());
  return { ...mock, ...gameData };
}
