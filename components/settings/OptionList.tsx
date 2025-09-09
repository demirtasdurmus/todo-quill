import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";
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

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
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

const styles = StyleSheet.create({
  card: {
    borderRadius: globalStyles.borderRadius.lg,
    ...globalStyles.shadows.sm,
  },
});
