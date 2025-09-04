import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../src/providers/ThemeProvider";
import { AppLoader } from "../src/components/AppLoader";
import { useTheme } from "../src/hooks";

const AppContent: React.FC = () => {
  const { isLoaded } = useTheme();

  if (!isLoaded) {
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
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
