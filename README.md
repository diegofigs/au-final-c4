## Chain 4

A Web3 dapp that allows users to challenge and play Connect 4 matches with others.
The contract was authored by Miguel Piedrafita and is deployed on the Mumbai testnet
at address [0x2A20791964a1275d8f3d24f959185E1551e2B6C9](https://mumbai.polygonscan.com/address/0x2a20791964a1275d8f3d24f959185e1551e2b6c9).
Hardhat is used to test and deploy contract, providing TS native tooling. 
The Graph is used to keep track of games, events and protocol stats.

## Built With

* [Vite](https://vitejs.dev/)
* [Hardhat](https://hardhat.org/)
* [The Graph](https://thegraph.com/studio/)
* [wagmi](https://wagmi.sh/): contract hooks
* [RainbowKit](https://www.rainbowkit.com/): wallet connection
* [tailwindcss](https://tailwindcss.com/): CSS framework
* [Apollo](https://www.apollographql.com/): GraphQL tooling


## Getting Started

Navigate to `app` folder and install dependencies
```
cd app
pnpm install
```

Start the development server
```
pnpm dev
```

## Acknowledgments
Special thanks to [m1guelpf](https://github.com/m1guelpf) & [t11s](https://github.com/transmissions11)
- [connect4-sol](https://github.com/m1guelpf/connect4-sol): original contract repo



