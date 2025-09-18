import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { globalStyles } from "@/theme";
import { loadThemeMode, saveThemeMode, ThemeMode } from "@/services/storage";

export type Theme = {
  colors: typeof globalStyles.colors.light | typeof globalStyles.colors.dark;
};

export type ThemeContextType = {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (_mode: ThemeMode) => void;
  isLoaded: boolean;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = useMemo((): Theme => {
    const colorTheme =
      themeMode === "system"
        ? systemColorScheme === "dark"
          ? globalStyles.colors.dark
          : globalStyles.colors.light
        : themeMode === "dark"
          ? globalStyles.colors.dark
          : globalStyles.colors.light;

    return {
      colors: colorTheme,
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
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
        isLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
