import { z } from "zod";

export const gameSchema = z.object({
  name: z.string(),
  required_age: z.string(),
  is_free: z.boolean(),
  controller_support: z.string().nullable().optional(),
  detailed_description: z.string(),
  about_the_game: z.string(),
  short_description: z.string(),
  supported_languages: z.string().nullable().optional(),
  header_image: z.string(),
  website: z.string().nullable().optional(),

  // Requirements
  pc_requirements: z.null(),
  mac_requirements: z.null(),
  linux_requirements: z.null(),

  legal_notice: z.string().nullable().optional(),
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
    .nullable()
    .optional(),
});

export type Game = z.infer<typeof gameSchema>;

export const gameSchemaOld = {
  type: "object",
  description: "Exhaustive game metadata matching Swift Game struct",
  properties: {
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

    // Requirements
    pc_requirements: { type: ["object", "null"], additionalProperties: false },
    mac_requirements: { type: ["object", "null"], additionalProperties: false },
    linux_requirements: {
      type: ["object", "null"],
      additionalProperties: false,
    },

    legal_notice: { type: ["string", "null"] },
    developers: {
      type: "array",
      items: { type: "string" },
    },
    publishers: {
      type: "array",
      items: { type: "string" },
    },

    // Platforms Object
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

    // Taxonomy Arrays
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
