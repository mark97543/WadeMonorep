// packages/shared/sdk/src/schema.ts

/**
 * This file holds the master schema for the Directus instance.
 * It's used by the SDK to provide type-safe access to the API.
 */

// *******************************************************************
// Collections
// *******************************************************************

export interface Service {
  id: string | number;
  status: string;
  sort: number;
  title: string;
  description: string;
  icon_name: string;
}

export interface DirectusUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    role: string | DirectusRole;
}

export interface DirectusRole {
    id:string;
    name: string;
}


// *******************************************************************
// Singletons
// *******************************************************************

export interface GlobalSettings {
  id: string | number;
  brand_name: string;
  primary_color: string;
}


// *******************************************************************
// This is the "Master Map" the SDK is looking for
// *******************************************************************
export interface WadeSchema {
  Services: Service[];            // A collection is an array
  Global_Settings: GlobalSettings; // A singleton is a single object
  directus_users: DirectusUser[];
  directus_roles: DirectusRole[];
}
