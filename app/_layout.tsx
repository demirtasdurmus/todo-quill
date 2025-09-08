import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../providers/ThemeProvider";
import { LanguageProvider } from "../providers/LanguageProvider";
import { AppLoader } from "../components/ui/AppLoader";
import { useTheme, useLanguage } from "../hooks";

const AppContent: React.FC = () => {
  const { isLoaded: themeLoaded } = useTheme();
  const { isLoaded: languageLoaded } = useLanguage();

  if (!themeLoaded || !languageLoaded) {
    return <AppLoader />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}
