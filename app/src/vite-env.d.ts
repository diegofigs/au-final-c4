/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ALCHEMY_ID: string
  readonly ALCHEMY_SEPOLIA_URL: string;
  readonly MNEMONIC: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
