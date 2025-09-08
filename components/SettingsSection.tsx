import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/use-theme";
import { useThemedStyles } from "../hooks/use-themed-styles";

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
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        section: {
          marginTop: theme.spacing.sm,
        },
        sectionTitle: {
          fontSize: theme.typography.sizes.sm,
          fontWeight: theme.typography.weights.semibold,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        },
        description: {
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.text.secondary,
          marginTop: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          lineHeight: 20,
        },
      }),
    theme
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
