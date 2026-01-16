// apps/main/src/types/schema.ts

/**
 * Use This file to Hold schema for the app. 
 */

export interface Service {
  id: string | number;
  status: string;
  sort: number;
  title: string;
  description: string;
  icon_name: string;
}

export interface GlobalSettings {
  id: string | number;
  brand_name: string;
  primary_color: string;
  // ... add your other fields from Phase 6
}

// This is the "Master Map" the SDK is looking for
export interface WadeSchema {
  Services: Service[];            // A collection is an array
  Global_Settings: GlobalSettings; // A singleton is a single object
}