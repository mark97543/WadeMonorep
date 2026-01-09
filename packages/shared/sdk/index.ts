
import { createDirectus, rest, staticToken, serverInfo } from '@directus/sdk';

const client = createDirectus('https://api.wade-usa.com')
    .with(staticToken(import.meta.env.VITE_DIRECTUS_TOKEN))
    .with(rest());

// Export 'serverInfo' instead of 'readServerInfo'
export { client, serverInfo };