import React, { PropsWithChildren } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../hooks/use-theme";
import { useThemedStyles } from "../../hooks/use-themed-styles";

export const ScreenHeader: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        header: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          alignItems: "center",
        },
        title: {
          fontSize: theme.typography.sizes["xl"],
          fontWeight: theme.typography.weights.bold,
          color: theme.colors.text.primary,
        },
      }),
    theme
  );

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};
