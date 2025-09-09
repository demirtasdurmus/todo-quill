import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.inner}>{children}</View>
      <StatusBar
        style={theme.colors.background === "#f9fafb" ? "dark" : "light"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: globalStyles.spacing.md,
  },
});
