import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { useLanguage, useTheme } from "@/hooks";
import { LanguageProvider, ThemeProvider } from "@/providers";
import { AppLoader } from "@/components/shared/AppLoader";

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
    <GestureHandlerRootView>
      <LanguageProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}
