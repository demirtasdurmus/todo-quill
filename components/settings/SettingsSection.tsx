import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";

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
    marginTop: globalStyles.spacing.md,
  },
  sectionTitle: {
    fontSize: globalStyles.typography.sizes.base,
    fontWeight: globalStyles.typography.weights.semibold,
    marginBottom: globalStyles.spacing.sm,
    paddingHorizontal: globalStyles.spacing.md,
  },
  description: {
    fontSize: globalStyles.typography.sizes.xs,
    marginTop: globalStyles.spacing.sm,
    paddingHorizontal: globalStyles.spacing.md,
    lineHeight: globalStyles.spacing.lg,
  },
});
