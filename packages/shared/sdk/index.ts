import { createDirectus, rest, staticToken, readItems } from '@directus/sdk';

// 1. Create the client
const client = createDirectus('https://api.wade-usa.com')
    .with(staticToken(import.meta.env.VITE_DIRECTUS_TOKEN))
    .with(rest());

// 2. Export the client and common methods you'll use everywhere
export { client, readItems };