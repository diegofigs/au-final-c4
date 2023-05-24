import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../hardhat",
      deployments: {
        ConnectFour: {
          80001: '0x2A20791964a1275d8f3d24f959185E1551e2B6C9',
        }
      }
    }),
    react(),
  ],
});
