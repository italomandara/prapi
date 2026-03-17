import type { Nullable } from "./util.types.js";

type Category = { id: number; description: string };
type Genre = { id: string; description: string };
type Sub = {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
};

type PackageGroup = {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: string;
  is_recurring_subscription: string;
  subs: Sub[];
};
type Movie = {
  id: number;
  name: string;
  thumbnail: string;
  dash_av1: string;
  dash_h264: string;
  hls_h264: string;
  highlight: boolean;
};

type HLight = {
  name: string;
  path: string;
};

type Requirement = {
  minimum: string;
  recommended?: string;
};

type Screenshot = {
  id: number;
  path_thumbnail: string;
  path_full: string;
};

type Rating = {
  rating_generated?: string;
  rating: string;
  required_age?: string;
  banned?: string;
  use_age_gate?: string;
  descriptors?: string;
};

type Demo = {
  appid: number;
  description: string;
};

type PriceOverview = {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
};

export type SteamStoreGameItem = {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number | string;
  is_free: boolean;
  controller_support: string;
  demos: Demo[];
  price_overview: PriceOverview;
  legal_notice: string;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: Nullable<Requirement>;
  mac_requirements: Nullable<Requirement>;
  linux_requirements: Nullable<Requirement>;
  developers: string[];
  publishers: string[];
  packages: number[];
  package_groups: PackageGroup[];
  platforms: { windows: boolean; mac: boolean; linux: boolean };
  metacritic?: {
    score: number;
    url: string;
  };
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  movies: Movie[];
  recommendations: { total: number };
  achievements: {
    total: number;
    highlighted: HLight[];
  };
  release_date: { coming_soon: boolean; date: string };
  support_info: {
    url: string;
    email: string;
  };
  background: string;
  background_raw: string;
  content_descriptors: { ids: number[]; notes: string | null };
  ratings: Record<string, Rating>;
};

export type SteamStoreGameData = {
  success: boolean;
  data: SteamStoreGameItem;
};

export type SteamStoreAPIResponse = {
  data: Record<string, SteamStoreGameData>;
};

export type PlayerSummary = {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  loccountrycode?: string;
  locstatecode?: string;
};

export type GetPlayerSummariesResponse = {
  data: {
    response: {
      players: PlayerSummary[];
    };
  };
};
