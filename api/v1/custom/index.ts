import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    data: [
      {
        name: "Dead Cells",
        header_image:
          "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/header.jpg?t=1772726488",
        platforms: {
          windows: true,
          mac: true,
          linux: true,
        },
        detailed_description:
          "Dead Cells is a roguelite, metroidvania inspired, action-platformer. You'll explore a sprawling, ever-changing castle... assuming you’re able to fight your way past its keepers in 2D souls-lite combat. No checkpoints. Kill, die, learn, repeat.\n\nDead Cells puts you in control of a failed alchemic experiment trying to figure out what's happening on a sprawling, ever-changing and seemingly cursed Island. Immortal but crippled, your last resort is to take over bodies in order to move, explore… and fight.\n\nWhile you may well be immortal, the corpses you possess are not. Each time your host is destroyed, you will be sent back to the dungeon to find yourself a new one and start again...\n\nExperience a Roguevania, mixing an interconnected world, branching paths and unlockable skills with the constant adrenaline-pumping threat of permadeath.  No checkpoints. You either vanquish the final boss in one go or you try again. However, you keep some of your progress for successive runs new paths you’ve unlocked, access to new levels, mutations, abilities and weapons.\n\nTough but fair combat, responsive controls, challenging foes, and of course, the emergency panic roll to get you out of trouble make for a visceral and cathartic action game.",
        about_the_game:
          "Dead Cells is a roguelite, metroidvania inspired, action-platformer. You'll explore a sprawling, ever-changing castle... assuming you’re able to fight your way past its keepers in 2D souls-lite combat. No checkpoints. Kill, die, learn, repeat.\n\nDead Cells puts you in control of a failed alchemic experiment trying to figure out what's happening on a sprawling, ever-changing and seemingly cursed Island. Immortal but crippled, your last resort is to take over bodies in order to move, explore… and fight.\n\nWhile you may well be immortal, the corpses you possess are not. Each time your host is destroyed, you will be sent back to the dungeon to find yourself a new one and start again...\n\nExperience a Roguevania, mixing an interconnected world, branching paths and unlockable skills with the constant adrenaline-pumping threat of permadeath.  No checkpoints. You either vanquish the final boss in one go or you try again. However, you keep some of your progress for successive runs new paths you’ve unlocked, access to new levels, mutations, abilities and weapons.\n\nTough but fair combat, responsive controls, challenging foes, and of course, the emergency panic roll to get you out of trouble make for a visceral and cathartic action game.",
        short_description:
          "Dead Cells is a roguelite, metroidvania inspired, action-platformer. You'll explore a sprawling, ever-changing castle... assuming you’re able to fight your way past its keepers in 2D souls-lite combat. No checkpoints. Kill, die, learn, repeat.",
        developers: ["Motion Twin"],
        publishers: ["Motion Twin"],
        categories: [
          {
            id: 2,
            description: "Single-player",
          },
          {
            id: 22,
            description: "Steam Achievements",
          },
          {
            id: 28,
            description: "Full controller support",
          },
          {
            id: 29,
            description: "Steam Trading Cards",
          },
          {
            id: 30,
            description: "Steam Workshop",
          },
          {
            id: 23,
            description: "Steam Cloud",
          },
          {
            id: 41,
            description: "Remote Play on Phone",
          },
          {
            id: 42,
            description: "Remote Play on Tablet",
          },
          {
            id: 43,
            description: "Remote Play on TV",
          },
          {
            id: 62,
            description: "Family Sharing",
          },
        ],
        genres: [
          {
            id: "1",
            description: "Action",
          },
          {
            id: "25",
            description: "Adventure",
          },
          {
            id: "23",
            description: "Indie",
          },
        ],
      },
    ],
  });
}
