// packages/shared/sdk/src/services.ts
import { client } from '../index'; 
import { readItems, readSingleton } from '@directus/sdk';
import { login, logout, readMe, createUser } from '@directus/sdk';

/**
 * GENERIC HELPER: Fetch Any Singleton
 * Now we pass the 'collectionName' as an argument!
 */
export const getSettingsGeneric = async (collectionName: string) => {
  try {
    // @ts-ignore
    const response = await client.request(
      readSingleton(collectionName as any, { fields: ['*'] })
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
export const getItemsGeneric = async (collectionName: string, query = {}) => {
  try {
    // @ts-ignore
    const response = await client.request(
      readItems(collectionName as any, query)
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
    // We use a generic try/catch to catch network timeouts or 401s
    await (client as any).login(email, pass); 
    return { success: true };
  } catch (error: any) {
    console.error("SDK Auth Error: Login Failed", error);
    // FAIL-SAFE: Return a friendly message instead of a raw crash
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
    await client.logout();
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
    // This syntax is the most robust for the Directus v11+ SDK
    const response = await client.request(
      readMe({
        fields: ['*', 'role.*'] // This tells Directus: "Give me the user AND everything inside the role"
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
    // FAIL-SAFE: Pull from .env so the template works on ANY server
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