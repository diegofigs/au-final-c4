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
          0: '0xF998c96805E884226d52fe5752B57F4A6FDecAec'
        }
      }
    }),
    react(),
  ],
});
