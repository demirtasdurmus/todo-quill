import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";
import { InfoItem } from "./InfoItem";

export type InfoListProps = {
  items: Array<{
    label: string;
    value: string;
    icon?: keyof typeof Ionicons.glyphMap;
  }>;
};

export const InfoList: React.FC<InfoListProps> = ({ items }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      {items.map((item, index) => (
        <InfoItem
          key={item.label}
          label={item.label}
          value={item.value}
          icon={item.icon}
          isLast={index === items.length - 1}
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
