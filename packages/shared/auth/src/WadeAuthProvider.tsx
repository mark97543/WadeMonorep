// packages/shared/auth/src/WadeAuthProvider.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getCurrentUser, loginUser, logoutUser } from '@wade-usa/sdk';

const AuthContext = createContext<any>(null);

export const WadeAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      // 🔍 THE INSPECTOR LOG
      // console.log("--- AUTH CHECK ---");
      // console.log("Full User Object:", currentUser);
      // console.log("Role Field Value:", currentUser?.role);
      // console.log("Role Type:", typeof currentUser?.role);
      // console.log("------------------");
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await loginUser(email, pass);
    if (res.success) await checkAuth();
    return res;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  // The Brain: Mapping UUIDs to User Levels
  const authState = useMemo(() => {
    const roleId = user?.role; 
    
    // 1. Get IDs and .trim() them to be safe
    const ADMIN_ID = import.meta.env.VITE_ADMIN_ROLE_ID?.trim();
    const BASIC_ID = import.meta.env.VITE_BASIC_ROLE_ID?.trim();
    const PENDING_ID = import.meta.env.VITE_PENDING_ROLE_ID?.trim();

    // 2. Logic Gates
    const isAdmin = roleId === ADMIN_ID;
    const isBasic = roleId === BASIC_ID || isAdmin;
    const isPending = roleId === PENDING_ID;
    const isPublic = !user;

    // 3. Labels
    let roleLabel = "Guest";
    if (user) {
      if (isAdmin) roleLabel = "Administrator";
      else if (isBasic) roleLabel = "Basic Member";
      else if (isPending) roleLabel = "Pending Approval";
      else roleLabel = `Unknown Role (${roleId})`; // <--- This will tell us if it's a mismatch
    }

    return { user, loading, isAdmin, isBasic, isPending, isPublic, roleLabel };
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a WadeAuthProvider');
  return context;
};