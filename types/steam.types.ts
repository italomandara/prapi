type Category = { id: number; description: string };
type Genre = { id: number; description: string };
type Sub = {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: true;
  price_in_cents_with_discount: number;
};

type PackageGroup = {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
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
  highlight: true;
};

type HLight = {
  name: string;
  path: string;
};

type Requirement = {
  minimum: string;
  recommended?: string;
} | null;

type Screenshot = {
  id: number;
  path_thumbnail: string;
  path_full: string;
};

export type SteamStoreGameData = {
  success: boolean;
  data: {
    type: string;
    name: string;
    steam_appid: number;
    required_age: number | string;
    is_free: boolean;
    dlc: number[];
    detailed_description: string;
    about_the_game: string;
    short_description: string;
    supported_languages: string;
    header_image: string;
    capsule_image: string;
    capsule_imagev5: string;
    website: string;
    pc_requirements: Requirement;
    mac_requirements: Requirement;
    linux_requirements: Requirement;
    developers: string[];
    publishers: string[];
    packages: number[];
    package_groups: PackageGroup[];
    platforms: { windows: true; mac: false; linux: true };
    metacritic: {
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
    release_date: { coming_soon: false; date: string };
    support_info: {
      url: string;
      email: string;
    };
    background: string;
    background_raw: string;
    content_descriptors: { ids: number[]; notes: string | null };
    ratings: {
      usk: { rating: string };
      agcom: { rating: string; descriptors: string };
      dejus: {
        rating_generated: string;
        rating: string;
        required_age: string;
        banned: string;
        use_age_gate: string;
        descriptors: string;
      };
      steam_germany: {
        rating_generated: string;
        rating: string;
        required_age: string;
        banned: string;
        use_age_gate: string;
        descriptors: string;
      };
    };
  };
};

export type SteamStoreAPIResponse = {
  data: Record<string, SteamStoreGameData>;
};
