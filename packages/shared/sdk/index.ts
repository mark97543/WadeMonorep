import { createDirectus, rest, authentication } from '@directus/sdk';
import type { WadeSchema } from './src/schema';

const CMS_URL = (import.meta as any).env?.VITE_DIRECTUS_URL || 'https://api.wade-usa.com';

// CLEAN: No static token, just the URL and the Auth Plugin
export const client = createDirectus<WadeSchema>(CMS_URL)
    .with(authentication('cookie'))
    .with(rest());

export * from "./src/services";
export * from "./src/schema";