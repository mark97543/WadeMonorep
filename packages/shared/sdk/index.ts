import { createDirectus, rest, authentication } from '@directus/sdk';

const CMS_URL = (import.meta as any).env?.VITE_DIRECTUS_URL || 'https://api.wade-usa.com';

// CLEAN: No static token, just the URL and the Auth Plugin
export const client = createDirectus(CMS_URL)
    .with(authentication('cookie'))
    .with(rest());

export * from "./src/services";