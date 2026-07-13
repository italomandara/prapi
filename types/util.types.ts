export type Nullable<T> = T | null;

type VulkanOptions = "experimental" | "latest" | "dbh" | "kosmickrisp";
type CxGraphicsBackend =
  | "dxmt"
  | "d3dmetal3"
  | "d3dmetal4"
  | "wined3d"
  | "dxvk"
  | "auto";

export type GameSettings = {
  cxGraphicsBackend?: CxGraphicsBackend;
  wineMSync?: boolean;
  mtlHudEnabled?: boolean;
  x87PatchEnabled?: boolean;
  dx9PatchEnabled?: boolean;
  gameArguments?: string;
  dxmtPreferredMaxFrameRate?: number;
  dxmtMetalFXSpatial?: boolean;
  dxmtMetalSpatialUpscaleFactor?: number;
  advertiseAVX?: boolean;
  envVariables?: string;
  enableSDL?: boolean;
  disableHidraw?: boolean;
  ue4Hack?: boolean;
  mvkArgBuff?: string;
  vulkanLib?: VulkanOptions;
  dxvk?: string;
  wineEsync?: boolean;
  d3dMEnableMetalFX?: boolean;
  d3dSupportDXR?: boolean;
  d3dMtl4Enabled?: boolean;
  d3dMaxFPS?: number;
};
