import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/use-theme";
import { useThemedStyles } from "../../hooks/use-themed-styles";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "./RadioButton";

export type OptionItemProps<T> = {
  value: T;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onSelect: (_value: T) => void;
  isLast?: boolean;
};

export const OptionItem = <T,>({
  value,
  label,
  icon,
  selected,
  onSelect,
  isLast = false,
}: OptionItemProps<T>) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        option: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: theme.colors.border,
        },
        optionContent: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        },
        optionIcon: {
          marginRight: theme.spacing.sm,
          width: 24,
          alignItems: "center",
        },
        optionText: {
          fontSize: theme.typography.sizes.base,
          color: theme.colors.text.primary,
          flex: 1,
        },
      }),
    theme
  );

  return (
    <TouchableOpacity style={styles.option} onPress={() => onSelect(value)}>
      <View style={styles.optionContent}>
        <View style={styles.optionIcon}>
          <Ionicons name={icon} size={20} color={theme.colors.text.primary} />
        </View>
        <Text style={styles.optionText}>{label}</Text>
      </View>
      <RadioButton selected={selected} />
    </TouchableOpacity>
  );
};
