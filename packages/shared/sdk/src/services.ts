// packages/shared/sdk/src/services.ts
import { client } from '../index'; 
import { readItems, readSingleton } from '@directus/sdk';
import { login, logout, readMe, createUser } from '@directus/sdk';
import type { WadeSchema } from './schema';

// Helper types to differentiate between regular and singleton collections
type SingletonCollections<T> = {
  [K in keyof T]: T[K] extends any[] ? never : K;
}[keyof T];

type RegularCollections<T> = {
  [K in keyof T]: T[K] extends any[] ? K : never;
}[keyof T];


/**
 * GENERIC HELPER: Fetch Any Singleton
 */
export const getSettingsGeneric = async <T extends SingletonCollections<WadeSchema>>(collectionName: T) => {
  try {
    const response = await client.request(
      readSingleton(collectionName, { fields: ['*'] })
    );
    return response;
  } catch (error) {
    console.error(`SDK Error: Failed to fetch ${collectionName}`, error);
    return null;
  }
};

/**
 * GENERIC HELPER: Fetch Any List
 */
export const getItemsGeneric = async <T extends RegularCollections<WadeSchema>>(collectionName: T, query = {}) => {
  try {
    const response = await client.request(
      readItems(collectionName, query)
    );
    return response;
  } catch (error) {
    console.error(`SDK Error: Failed to fetch ${collectionName}`, error);
    return [];
  }
};

/**
 * AUTH: Login 
 */
export const loginUser = async (email: string, pass: string) => {
  try {
    await client.request(login({ email, password: pass })); 
    return { success: true };
  } catch (error: any) {
    console.error("SDK Auth Error: Login Failed", error);
    return { 
      success: false, 
      error: error.errors?.[0]?.message || "Invalid credentials or server offline." 
    };
  }
};

/**
 * AUTH: Logout
 * Destroys the session cookie
 */
export const logoutUser = async () => {
  try {
    await client.request(logout());
    return { success: true };
  } catch (error) {
    console.error("SDK Auth Error: Logout Failed", error);
    return { success: false };
  }
};

/**
 * AUTH: Get Current User
 * Checks if a cookie exists and returns the user's profile
 */
export const getCurrentUser = async () => {
  try {
    const response = await client.request(
      readMe({
        // The 'role.*' is valid for the API, but TS can't parse it.
        // Using 'as any' here is a pragmatic workaround.
        fields: ['*', 'role.*' as any] 
      })
    );
    
    console.log("DEBUG: System User Fetch ->", response);
    return response;
  } catch (error) {
    console.error("SDK Error: Fetch failed", error);
    return null;
  }
};

/**
 * Registers a new user and assigns them the 'Pending' role by default.
 */
export const registerUser = async (email: string, pass: string, firstName: string, lastName: string) => {
  try {
    const PENDING_ROLE_ID = import.meta.env.VITE_PENDING_ROLE_ID || "4248f44d-ec36-4dc8-9f76-86b3fe550d26"; 

    const result = await client.request(
      createUser({
        email,
        password: pass,
        first_name: firstName,
        last_name: lastName,
        role: PENDING_ROLE_ID,
        status: 'active'
      })
    );
    
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Registration Error:", error);
    return { 
      success: false, 
      error: error.errors?.[0]?.message || "Registration failed. Please try again." 
    };
  }
};