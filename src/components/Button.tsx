import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme, useThemedStyles } from "../hooks";

type ButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export const Button: React.FC<ButtonProps> = ({ label, active, onPress }) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        filterBtn: {
          backgroundColor: theme.colors.border,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.full,
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.text.secondary,
        },
        filterActive: {
          backgroundColor: theme.colors.primary,
          color: theme.colors.text.inverse,
        },
      }),
    theme
  );

  return (
    <Text
      onPress={onPress}
      style={[styles.filterBtn, active && styles.filterActive]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      {label}
    </Text>
  );
};
