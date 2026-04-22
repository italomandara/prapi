import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    id: "/Applications/Games/MyCoolGame.app/Contents/MacOS/MyCoolGame",
    name: "My Cool Game",
    headerImage: "https://example.com/images/my-cool-game-header.jpg",
    isCustom: true,
    isNative: true,

    appExeURL:
      "file:///Applications/Games/MyCoolGame.app/Contents/MacOS/MyCoolGame",
    appNames: ["MyCoolGame"],

    platforms: {
      windows: false,
      mac: true,
      linux: false,
    },

    detailedDescription:
      "An epic adventure across a vibrant open world with deep combat and exploration.",
    aboutTheGame:
      "My Cool Game is a story-driven action RPG with crafting, companions, and branching quests.",
    shortDescription: "Story-rich action RPG with exploration and crafting.",

    developers: ["Cool Studio", "Another Dev"],
    publishers: ["Great Publisher Inc."],

    categories: [
      { id: 1, description: "Single-player" },
      { id: 2, description: "Controller Support" },
      { id: 3, description: "Cloud Saves" },
    ],

    genres: [
      { id: "1", description: "Action" },
      { id: "2", description: "RPG" },
    ],
  });
}
