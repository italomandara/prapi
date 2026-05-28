import type {
  SteamStoreAPIResponse,
  SteamStoreGameData,
  SteamStoreGameItem,
} from "../types/steam.types.js";
import type { SteamSpyGameData } from "../types/steamSpy.types.js";
import { GoogleGenAI } from "@google/genai";
import { gameSchemaJSON2, gameSchemaJSON } from "../schemas/gq.js";
import { gameSchema } from "../schemas/gg.js";
import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { systemInstruction } from "../schemas/instructions.js";

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
  // steam_app_id: 0,
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

// 1. Initialize the client (automatically looks for process.env.GEMINI_API_KEY)

export async function getGoogleGameMetadata(hints: string, apiKey = "") {
  if (!apiKey && !process.env.AIS_KEY) {
    throw new Error(
      "DEPLOYMENT ERROR: process.env.AIS_KEY is undefined. " +
        "Please check your Vercel Environment Variables and redeploy.",
    );
  }
  const ai = new GoogleGenAI({ apiKey: apiKey || process.env.AIS_KEY || "" });
  const prompt = `Return the metadata for the game with this path: ${hints}`;
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      // Forces the structured schema output
      responseMimeType: "application/json",
      responseSchema: gameSchema as any,
      // Passes the built-in Google Search tool
      tools: [{ googleSearch: {} }],
    },
  });
  const gameData = JSON.parse(result.text || "{}");
  return { ...mock, ...gameData };
}

// const groq = createGroq({ apiKey: process.env.AI_GRQ_KEY || "" });

export async function getGameMetadata(hints: string) {
  // Step 1: compound-beta searches the web, returns raw text

  const authString = `Bearer ${process.env.AI_GRQ_KEY}`;

  const searchRes = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: authString,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "compound-beta",
        messages: [
          {
            role: "system",
            content: `Try and guess what game is from the given path, then search for the Steam game and return ALL of the following as detailed plain text:
            - Steam app ID, full name, age rating, price (free or not)
            - Short, detailed, and about descriptions
            - Supported languages, header image URL, website
            - Developer(s) and publisher(s)
            - Platform support (Windows/Mac/Linux)
            - PC/Mac/Linux system requirements (minimum and recommended)
            - Categories and genres (with their IDs)
            - Controller support, legal notices
            Be exhaustive. Do not summarise — include every detail you find.`,
          },
          { role: "user", content: `Steam game path: ${hints}` },
        ],
      }),
    },
  );

  const searchData = await searchRes.json();
  console.log("Raw search data:", JSON.stringify(searchData, null, 2));
  const rawText = searchData.choices[0].message.content;

  // Step 2: llama-3.3-70b extracts into your strict schema
  const extractRes = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: authString,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "game_result",
            strict: true,
            schema: gameSchemaJSON,
          },
        },
        messages: [
          {
            role: "system",
            content:
              "Extract the game data from the provided text into the JSON schema. Populate every field accurately. Use null for fields with no data found.",
          },
          {
            role: "user",
            content: `Game research data:\n\n${rawText}`,
          },
        ],
      }),
    },
  );

  const extractData = await extractRes.json();
  return JSON.parse(extractData.choices[0].message.content);
}
