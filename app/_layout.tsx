import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../src/providers/ThemeProvider";
import { LanguageProvider } from "../src/providers/LanguageProvider";
import { AppLoader } from "../src/components/AppLoader";
import { useTheme, useLanguage } from "../src/hooks";

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
