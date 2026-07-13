export type Nullable<T> = T | null;

export type GameSettings = {
  cxGraphicsBackend?: string;
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
  vulkanLib?: string;
  dxvk?: string;
  wineEsync?: boolean;
  d3dMEnableMetalFX?: boolean;
  d3dSupportDXR?: boolean;
  d3dMtl4Enabled?: boolean;
  d3dMaxFPS?: number;
};
