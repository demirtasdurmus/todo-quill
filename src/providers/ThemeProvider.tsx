import React, { createContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { themes } from "../theme/colors";
import { spacing, borderRadius } from "../theme/spacing";
import { typography } from "../theme/typography";
import { shadows } from "../theme/shadows";
import { loadThemeMode, saveThemeMode } from "../services/storage";

export type ThemeMode = "light" | "dark" | "system";

export type Theme = {
  colors: typeof themes.light | typeof themes.dark;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  shadows: typeof shadows;
};

export type ThemeContextType = {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (_mode: ThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = useMemo((): Theme => {
    const colorTheme =
      themeMode === "system"
        ? systemColorScheme === "dark"
          ? themes.dark
          : themes.light
        : themeMode === "dark"
          ? themes.dark
          : themes.light;

    return {
      colors: colorTheme,
      spacing,
      borderRadius,
      typography,
      shadows,
    };
  }, [themeMode, systemColorScheme]);

  useEffect(() => {
    loadThemeMode().then((savedThemeMode) => {
      setThemeMode(savedThemeMode);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveThemeMode(themeMode);
    }
  }, [themeMode, isLoaded]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
