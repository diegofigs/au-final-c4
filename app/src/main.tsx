import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { gnosisChiado } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { GamePage } from "./pages/GamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: HomePage },
      { path: "/game/:gameId", Component: GamePage },
    ],
  },
]);

const { chains, publicClient } = configureChains(
  [gnosisChiado],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Chain 4",
  projectId: "CONNECT_FOUR",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
