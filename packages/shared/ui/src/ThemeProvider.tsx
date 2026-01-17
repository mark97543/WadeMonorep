import React, { useLayoutEffect } from 'react';

interface ThemeProps {
  themeData?: Record<string, any>; // Optional for flexibility
  children: React.ReactNode;
}

export const WadeThemeProvider = ({ themeData = {}, children }: ThemeProps) => {

  console.log("UI PACKAGE DETECTED: ThemeProvider file is alive")

  useLayoutEffect(() => {
    const root = document.documentElement;

    // 1. Setup Defaults
    // const defaults: Record<string, string> = {
    //   // '--background-color': '#0a0a0a', 
    //   // '--primary-color': '#00ffcc',
    //   // '--text-color': '#ffffff'
    // };

    // 2. Apply Defaults (This should always fire)
    // Object.entries(defaults).forEach(([varName, val]) => {
    //   root.style.setProperty(varName, val);
    //   console.log(`🏠 Default Set: ${varName} = ${val}`);
    // });

    // 3. Overwrite if themeData has keys
    const themeKeys = Object.keys(themeData);
    if (themeKeys.length > 0) {
      themeKeys.forEach((key) => {
        const value = themeData[key];
        if (value && typeof value === 'string') {
          const cssVarName = `--${key.replace(/_/g, '-')}`;
          root.style.setProperty(cssVarName, value);
          console.log(`✅ CMS Override: ${cssVarName} = ${value}`);
        }
      });
    } else {
      console.log("ℹ️ No themeData provided. Using system defaults.");
    }
  }, [themeData]);

  return <>{children}</>;
};