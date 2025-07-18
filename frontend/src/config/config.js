import { defaultConfig } from "@xellar/kit";
import { sepolia } from "viem/chains";

export const xellarConfig = defaultConfig({
  appName: "dex",
  walletConnectProjectId: import.meta.env.VITE_PROJECT_ID,
  xellarAppId: import.meta.env.VITE_XELLAR_APP_ID,
  xellarEnv: "sandbox",
  chains: [
    sepolia,
  ]
});