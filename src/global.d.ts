// src/global.d.ts
export {};

declare global {
  interface Window {
    mountChainlitWidget: (options: {
      chainlitServer: string;
      accessToken: string;
      theme: string;
      button: {
        style: {
          bgcolor: string;
          color: string;
          bgcolorHover: string;
          boxShadow: string;
          size: string;
        };
      };
    }) => void;
  }
}
