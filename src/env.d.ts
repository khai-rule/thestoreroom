/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_STYTCH_PUBLIC_TOKEN?: string
    readonly VITE_CONTENTFUL_ACCESS_TOKEN?: string
    readonly VITE_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN?: string
    readonly VITE_CONTENTFUL_SPACE_ID?: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }