import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { GamePage } from "./pages/GamePage";
import { EventsPage } from "./pages/EventsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: HomePage },
      { path: "/game/:gameId", Component: GamePage },
      { path: "/events", Component: EventsPage },
    ],
  },
]);

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY }),
    publicProvider(),
  ]
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

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/47213/chain-4-testnet/v0.0.13",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
