import React, { useLayoutEffect } from 'react';

interface ThemeProps {
  themeData: Record<string, any>;
  children: React.ReactNode;
}

export const WadeThemeProvider = ({ themeData, children }: ThemeProps) => {
  useLayoutEffect(() => {
    if (!themeData) return;

    const root = document.documentElement;
    // console.log("🎨 Injecting Theme Data:", themeData);

    Object.entries(themeData).forEach(([key, value]) => {
      // Only process string values (colors, radius, etc.)
      if (value && typeof value === 'string') {
        // Transform 'accent_color' -> '--accent-color'
        const cssVarName = `--${key.replace(/_/g, '-')}`;
        root.style.setProperty(cssVarName, value);
        console.log(`✅ Set ${cssVarName}: ${value}`);
      }
    });
  }, [themeData]);

  return <>{children}</>;
};