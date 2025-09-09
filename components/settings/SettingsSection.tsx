import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "@/theme";
import { useTheme } from "@/hooks";

export type SettingsSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.section}>
      <Text
        style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}
      >
        {title}
      </Text>

      {children}

      <Text
        style={[styles.description, { color: theme.colors.text.secondary }]}
      >
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: globalStyles.spacing.sm,
  },
  sectionTitle: {
    fontSize: globalStyles.typography.sizes.sm,
    fontWeight: globalStyles.typography.weights.semibold,
    marginBottom: globalStyles.spacing.sm,
    paddingHorizontal: globalStyles.spacing.md,
  },
  description: {
    fontSize: globalStyles.typography.sizes.sm,
    marginTop: globalStyles.spacing.sm,
    paddingHorizontal: globalStyles.spacing.md,
    lineHeight: globalStyles.spacing.lg,
  },
});
