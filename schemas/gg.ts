import { SchemaType } from "@google/generative-ai";

export const gameSchema = {
  description: "Comprehensive game metadata for library management",
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    is_native: { type: SchemaType.BOOLEAN },
    download_progress: { type: SchemaType.NUMBER },
    is_installed: { type: SchemaType.BOOLEAN },
    app_names: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    app_exe_url: {
      type: SchemaType.STRING,
      description: "File path as a file:// URL",
    },
    is_custom: { type: SchemaType.BOOLEAN, nullable: true },
    type: { type: SchemaType.STRING },
    name: { type: SchemaType.STRING },
    steam_app_id: {
      type: SchemaType.NUMBER,
      description: "0 if not available",
    },
    required_age: { type: SchemaType.STRING },
    is_free: { type: SchemaType.BOOLEAN },
    controller_support: { type: SchemaType.STRING, nullable: true },
    dlc: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.NUMBER },
      nullable: true,
    },
    detailed_description: { type: SchemaType.STRING },
    header_image: {
      type: SchemaType.STRING,
      description: "Must be a valid HTTP URL",
    },
    capsule_image: {
      type: SchemaType.STRING,
      description: "Must be a valid HTTP URL",
    },
    platforms: {
      type: SchemaType.OBJECT,
      properties: {
        windows: { type: SchemaType.BOOLEAN },
        mac: { type: SchemaType.BOOLEAN },
        linux: { type: SchemaType.BOOLEAN },
      },
    },
    release_date: {
      type: SchemaType.OBJECT,
      properties: {
        coming_soon: { type: SchemaType.BOOLEAN },
        date: { type: SchemaType.STRING },
      },
    },
    // ... add other properties as needed
  },
  required: [
    "id",
    "is_native",
    "name",
    "steam_app_id",
    "header_image",
    "platforms",
  ],
} as const;
