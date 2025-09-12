import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";

type InfoItemProps = {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isLast?: boolean;
};

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  icon,
  isLast = false,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme.colors.border },
        isLast ? { borderBottomWidth: 0 } : { borderBottomWidth: 1 },
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <View style={styles.icon}>
            <Ionicons name={icon} size={20} color={theme.colors.text.primary} />
          </View>
        )}
        <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
          {label}
        </Text>
      </View>
      <Text style={[styles.valueText, { color: theme.colors.text.secondary }]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: globalStyles.spacing.md,
    paddingVertical: globalStyles.spacing.sm,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: globalStyles.spacing.sm,
    width: globalStyles.spacing.lg,
    alignItems: "center",
  },
  labelText: {
    fontSize: globalStyles.typography.sizes.sm,
    flex: 1,
  },
  valueText: {
    fontSize: globalStyles.typography.sizes.sm,
    fontFamily: "monospace",
  },
});
