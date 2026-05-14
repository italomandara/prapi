import { SchemaType } from "@google/generative-ai";

export const gameSchema = {
  type: SchemaType.OBJECT,
  description: "Exhaustive game metadata matching Swift Game struct",
  properties: {
    // Basic Info
    id: { type: SchemaType.STRING },
    // is_native: { type: SchemaType.BOOLEAN },
    // download_progress: { type: SchemaType.NUMBER },
    // is_installed: { type: SchemaType.BOOLEAN },
    // app_names: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    // app_exe_url: { type: SchemaType.STRING, nullable: true }, // URL?
    // is_custom: { type: SchemaType.BOOLEAN, nullable: true }, // Bool?

    // Steam-derived Info
    // type: { type: SchemaType.STRING },
    name: { type: SchemaType.STRING },
    // steam_app_id: { type: SchemaType.NUMBER }, // Int
    required_age: { type: SchemaType.STRING },
    is_free: { type: SchemaType.BOOLEAN },
    controller_support: { type: SchemaType.STRING, nullable: true }, // String?
    // dlc: {
    //   type: SchemaType.ARRAY,
    //   items: { type: SchemaType.NUMBER },
    //   nullable: true,
    // }, // [Int]?

    // Descriptions
    detailed_description: { type: SchemaType.STRING },
    about_the_game: { type: SchemaType.STRING },
    short_description: { type: SchemaType.STRING },
    supported_languages: { type: SchemaType.STRING, nullable: true }, // String?

    // Images & Links
    header_image: { type: SchemaType.STRING },
    // capsule_image: { type: SchemaType.STRING },
    // capsule_image_v5: { type: SchemaType.STRING, nullable: true }, // String?
    website: { type: SchemaType.STRING, nullable: true }, // String?

    // Requirements (Objects)
    pc_requirements: { type: SchemaType.OBJECT, nullable: true },
    mac_requirements: { type: SchemaType.OBJECT, nullable: true },
    linux_requirements: { type: SchemaType.OBJECT, nullable: true },

    // Credits
    legal_notice: { type: SchemaType.STRING, nullable: true },
    developers: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    publishers: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },

    // Financials
    // price_overview: { type: SchemaType.OBJECT, nullable: true },
    // packages: {
    //   type: SchemaType.ARRAY,
    //   items: { type: SchemaType.NUMBER },
    //   nullable: true,
    // },
    // package_groups: {
    //   type: SchemaType.ARRAY,
    //   items: { type: SchemaType.OBJECT },
    //   nullable: true,
    // },

    // Platforms
    platforms: {
      type: SchemaType.OBJECT,
      properties: {
        windows: { type: SchemaType.BOOLEAN },
        mac: { type: SchemaType.BOOLEAN },
        linux: { type: SchemaType.BOOLEAN },
      },
      required: ["windows", "mac", "linux"],
    },

    // metacritic: { type: SchemaType.OBJECT, nullable: true },

    // Taxonomy
    categories: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.NUMBER },
          description: { type: SchemaType.STRING },
        },
      },
    },
    genres: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.OBJECT },
      nullable: true,
    },

    // Media
    // screenshots: {
    //   type: SchemaType.ARRAY,
    //   items: { type: SchemaType.OBJECT },
    //   nullable: true,
    // },
    // movies: {
    //   type: SchemaType.ARRAY,
    //   items: { type: SchemaType.OBJECT },
    //   nullable: true,
    // },

    // Extra Data
    // recommendations: { type: SchemaType.OBJECT, nullable: true },
    // achievements: { type: SchemaType.OBJECT, nullable: true },
    // release_date: {
    //   type: SchemaType.OBJECT,
    //   properties: {
    //     coming_soon: { type: SchemaType.BOOLEAN },
    //     date: { type: SchemaType.STRING },
    //   },
    //   required: ["coming_soon", "date"],
    // },
    // support_info: { type: SchemaType.OBJECT, nullable: true },
    // background: { type: SchemaType.STRING, nullable: true },
    // background_raw: { type: SchemaType.STRING, nullable: true },
    // content_descriptors: { type: SchemaType.OBJECT, nullable: true },
    // ratings: { type: SchemaType.OBJECT, nullable: true }, // Dictionary [String: RatingBody]
  },
  required: [
    "id",
    "is_native",
    "download_progress",
    "is_installed",
    "app_names",
    "type",
    "name",
    "steam_app_id",
    "required_age",
    "is_free",
    "detailed_description",
    "about_the_game",
    "short_description",
    "header_image",
    "capsule_image",
    "developers",
    "publishers",
    "platforms",
    "categories",
    "release_date",
  ],
} as const;
