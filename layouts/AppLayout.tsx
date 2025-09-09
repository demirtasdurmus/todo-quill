import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme, useThemedStyles } from "@/hooks";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        inner: {
          flex: 1,
          padding: theme.spacing.md,
        },
      }),
    theme
  );
  return (
    <View style={styles.container}>
      <View style={styles.inner}>{children}</View>
      <StatusBar
        style={theme.colors.background === "#f9fafb" ? "dark" : "light"}
      />
    </View>
  );
};
