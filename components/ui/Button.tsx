import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";

type ButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export const Button: React.FC<ButtonProps> = ({ label, active, onPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: theme.colors.border },
        active && { backgroundColor: theme.colors.primary },
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text
        style={[
          styles.filterText,
          { color: theme.colors.text.secondary },
          active && { color: theme.colors.text.inverse },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: globalStyles.spacing.md,
    paddingVertical: globalStyles.spacing.xs,
    borderRadius: globalStyles.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: {
    fontSize: globalStyles.typography.sizes.sm,
  },
  pressed: {
    opacity: 0.7,
  },
});
