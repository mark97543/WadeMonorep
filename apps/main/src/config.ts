// /root/wade-usa/apps/main/src/config.ts

export const WADE_CONFIG = {
  // Backend Connection
  cmsUrl: import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055',

  // Collection Names (The "Key" to your CMS)
  collections: {
    settings: 'Global_Settings'
  },
  auth:{
    enabled: true, //Toggle to false for a purely public site
    redirectPath:'/login'
  },
  //Branding (Static overrides if CMS is offline)
  branding: {
    appName: 'WADE-USA',
    fallbackColor: '#00ffcc',
  },
  //Favicon and Page Title
  page_title:{
    project_name: "Testing", //Set to Page Tab
    favicon_href:"./heart.png" //Set to href for the favicon
  }
};