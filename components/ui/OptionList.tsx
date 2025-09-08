import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/use-theme";
import { useThemedStyles } from "../../hooks/use-themed-styles";
import { Ionicons } from "@expo/vector-icons";
import { OptionItem } from "./OptionItem";

export type OptionListProps<T> = {
  options: Array<{
    value: T;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }>;
  selectedValue: T;
  onSelect: (_value: T) => void;
};

export const OptionList = <T,>({
  options,
  selectedValue,
  onSelect,
}: OptionListProps<T>) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadows.sm,
        },
      }),
    theme
  );

  return (
    <View style={styles.card}>
      {options.map((option, index) => (
        <OptionItem
          key={String(option.value)}
          value={option.value}
          label={option.label}
          icon={option.icon}
          selected={selectedValue === option.value}
          onSelect={onSelect}
          isLast={index === options.length - 1}
        />
      ))}
    </View>
  );
};
