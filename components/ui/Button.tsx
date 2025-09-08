import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { useTheme, useThemedStyles } from "../../hooks";

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
        btn: {
          backgroundColor: theme.colors.border,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.full,
          alignItems: "center",
          justifyContent: "center",
        },
        filterActive: {
          backgroundColor: theme.colors.primary,
        },
        filterText: {
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.text.secondary,
        },
        filterTextActive: {
          color: theme.colors.text.inverse,
        },
        pressed: {
          opacity: 0.7,
        },
      }),
    theme
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        active && styles.filterActive,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
};
