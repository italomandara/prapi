export const CACHE_LIFESPAN = "172800";
export const CACHE_STALE_REVALIDATE = "172800";
// export const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "https://prapi-chi.vercel.app";
export const baseUrl = "https://prapi-chi.vercel.app";
export const SteamStoreAPIBaseURL = "https://store.steampowered.com/api";
export const SteamAppInfoEndpoint = `${SteamStoreAPIBaseURL}/appdetails`;

export const gameSettings = {
  "379720": {
    // Doom 2016
    cxGraphicsBackend: "dxvk",
    gameArguments: "+r_renderAPI 1",
    envVariables:
      "MVK_CONFIG_MAX_ACTIVE_METAL_COMMAND_BUFFERS_PER_QUEUE=128 MVK_CONFIG_RESUME_LOST_DEVICE=1  MVK_CONFIG_SHOULD_MAXIMIZE_CONCURRENT_COMPILATION=1",
    vulkanLib: "experimental",
  },
  "782330": {
    // Doom Eternal
    cxGraphicsBackend: "dxvk",
    envVariables: "MVK_CONFIG_SHOULD_MAXIMIZE_CONCURRENT_COMPILATION=1",
    vulkanLib: "experimental",
  },
  "1222140": {
    // Detroit Become Human
    cxGraphicsBackend: "dxvk",
    envVariables:
      "MVK_CONFIG_METAL_COMPILE_TIMEOUT=5000000000 MVK_CONFIG_MAX_ACTIVE_METAL_COMMAND_BUFFERS_PER_QUEUE=128 MVK_CONFIG_RESUME_LOST_DEVICE=1  MVK_CONFIG_SHOULD_MAXIMIZE_CONCURRENT_COMPILATION=1  MVK_CONFIG_SHADER_COMPRESSION_ALGORITHM=3",
    vulkanLib: "experimental",
  },
};
