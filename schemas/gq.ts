import { z } from "zod";
import { jsonSchema } from "ai";

export const gameSchema = z.object({
  name: z.string(),
  required_age: z.string(),
  is_free: z.boolean(),
  controller_support: z.string().nullable(),
  detailed_description: z.string(),
  about_the_game: z.string(),
  short_description: z.string(),
  supported_languages: z.string().nullable(),
  header_image: z.string(),
  website: z.string().nullable(),

  // Requirements
  pc_requirements: z.null(),
  mac_requirements: z.null(),
  linux_requirements: z.null(),

  legal_notice: z.string().nullable(),
  developers: z.array(z.string()),
  publishers: z.array(z.string()),

  // Platforms
  platforms: z.object({
    windows: z.boolean(),
    mac: z.boolean(),
    linux: z.boolean(),
  }),

  // Taxonomy
  categories: z.array(
    z.object({
      id: z.number(),
      description: z.string(),
    }),
  ),
  genres: z
    .array(
      z.object({
        id: z.string(),
        description: z.string(),
      }),
    )
    .nullable(),
  required: [
    "name",
    "required_age",
    "is_free",
    "detailed_description",
    "about_the_game",
    "short_description",
    "header_image",
    "developers",
    "publishers",
    "platforms",
    "categories",
  ],
});

export type Game = z.infer<typeof gameSchema>;

export const gameSchemaJSON = {
  type: "object",
  description: "Exhaustive game metadata matching Swift Game struct",
  properties: {
    steam_app_id: { type: "string" },
    name: { type: "string" },
    required_age: { type: "string" },
    is_free: { type: "boolean" },
    controller_support: { anyOf: [{ type: "string" }, { type: "null" }] },
    detailed_description: { type: "string" },
    about_the_game: { type: "string" },
    short_description: { type: "string" },
    supported_languages: { anyOf: [{ type: "string" }, { type: "null" }] },
    header_image: { type: "string" },
    website: { anyOf: [{ type: "string" }, { type: "null" }] },

    pc_requirements: {
      anyOf: [
        {
          type: "object",
          properties: {
            minimum: { type: "string" },
            recommended: { anyOf: [{ type: "string" }, { type: "null" }] },
          },
          additionalProperties: false,
        },
        { type: "null" },
      ],
    },
    mac_requirements: {
      anyOf: [
        {
          type: "object",
          properties: {
            minimum: { type: "string" },
            recommended: { anyOf: [{ type: "string" }, { type: "null" }] },
          },
          additionalProperties: false,
        },
        { type: "null" },
      ],
    },
    linux_requirements: {
      anyOf: [
        {
          type: "object",
          properties: {
            minimum: { type: "string" },
            recommended: { anyOf: [{ type: "string" }, { type: "null" }] },
          },
          additionalProperties: false,
        },
        { type: "null" },
      ],
    },

    legal_notice: { anyOf: [{ type: "string" }, { type: "null" }] },
    developers: { type: "array", items: { type: "string" } },
    publishers: { type: "array", items: { type: "string" } },

    platforms: {
      type: "object",
      properties: {
        windows: { type: "boolean" },
        mac: { type: "boolean" },
        linux: { type: "boolean" },
      },
      required: ["windows", "mac", "linux"],
      additionalProperties: false,
    },

    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          description: { type: "string" },
        },
        required: ["id", "description"],
        additionalProperties: false,
      },
    },

    genres: {
      anyOf: [
        {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              description: { type: "string" },
            },
            required: ["id", "description"],
            additionalProperties: false,
          },
        },
        { type: "null" },
      ],
    },
  },
  required: [
    "steam_app_id",
    "name",
    "required_age",
    "is_free",
    "detailed_description",
    "about_the_game",
    "short_description",
    "header_image",
    "developers",
    "publishers",
    "platforms",
    "categories",
  ],
  additionalProperties: false,
} as const;

export const gameSchemaJSON2 = jsonSchema<Record<string, any>>({
  type: "object",
  properties: {
    steam_app_id: { type: "number" },
    name: { type: "string" },
    required_age: { type: "string" },
    is_free: { type: "boolean" },
    controller_support: { type: ["string", "null"] },
    detailed_description: { type: "string" },
    about_the_game: { type: "string" },
    short_description: { type: "string" },
    supported_languages: { type: ["string", "null"] },
    header_image: { type: "string" },
    website: { type: ["string", "null"] },
    pc_requirements: { type: "null" },
    mac_requirements: { type: "null" },
    linux_requirements: { type: "null" },
    legal_notice: { type: ["string", "null"] },
    developers: { type: "array", items: { type: "string" } },
    publishers: { type: "array", items: { type: "string" } },
    platforms: {
      type: "object",
      properties: {
        windows: { type: "boolean" },
        mac: { type: "boolean" },
        linux: { type: "boolean" },
      },
      required: ["windows", "mac", "linux"],
      additionalProperties: false,
    },
    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          description: { type: "string" },
        },
        required: ["id", "description"],
        additionalProperties: false,
      },
    },
    genres: {
      type: ["array", "null"],
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          description: { type: "string" },
        },
        required: ["id", "description"],
        additionalProperties: false,
      },
    },
  },
  required: [
    "name",
    "required_age",
    "is_free",
    "controller_support",
    "detailed_description",
    "about_the_game",
    "short_description",
    "supported_languages",
    "header_image",
    "website",
    "pc_requirements",
    "mac_requirements",
    "linux_requirements",
    "legal_notice",
    "developers",
    "publishers",
    "platforms",
    "categories",
    "genres",
  ],
  additionalProperties: false,
} as const);
