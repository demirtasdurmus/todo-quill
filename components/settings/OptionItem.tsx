import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";
import { ExpoVectorIcon } from "@/utils";
import { RadioButton } from "@/components/ui/RadioButton";

export type OptionItemProps<T> = {
  value: T;
  label: string;
  icon: ExpoVectorIcon;
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

  return (
    <TouchableOpacity
      style={[
        styles.option,
        { borderBottomColor: theme.colors.border },
        isLast ? { borderBottomWidth: 0 } : { borderBottomWidth: 1 },
      ]}
      onPress={() => onSelect(value)}
    >
      <View style={styles.optionContent}>
        <View style={styles.optionIcon}>
          <Ionicons
            name={icon}
            size={globalStyles.typography.sizes.xl}
            color={theme.colors.text.primary}
          />
        </View>
        <Text style={[styles.optionText, { color: theme.colors.text.primary }]}>
          {label}
        </Text>
      </View>
      <RadioButton selected={selected} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: globalStyles.spacing.md,
    paddingVertical: globalStyles.spacing.sm,
  },
  optionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: globalStyles.spacing.sm,
    width: globalStyles.spacing.lg,
    alignItems: "center",
  },
  optionText: {
    fontSize: globalStyles.typography.sizes.sm,
    flex: 1,
  },
});
