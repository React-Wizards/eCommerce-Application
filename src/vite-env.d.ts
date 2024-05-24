/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_KEY: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_AUTH_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_SCOPES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
