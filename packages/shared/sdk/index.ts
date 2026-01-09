import { createDirectus, rest, staticToken } from '@directus/sdk';

const client = createDirectus('https://api.wade-usa.com')
    .with(staticToken(import.meta.env.VITE_DIRECTUS_TOKEN))
    .with(rest());

export { client };