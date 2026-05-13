import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.status(200).json({
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
  });
}
