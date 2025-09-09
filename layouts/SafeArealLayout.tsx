import React, { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme, useThemedStyles } from "@/hooks";

export const SafeAreaLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.colors.background },
        keyboardAvoidingView: { flex: 1 },
      }),
    theme
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        {children}
      </KeyboardAvoidingView>
      <StatusBar
        style={theme.colors.background === "#f9fafb" ? "dark" : "light"}
      />
    </SafeAreaView>
  );
};
