import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/use-theme";
import { useThemedStyles } from "../hooks/use-themed-styles";
import { useLanguage } from "../hooks/use-language";
import { Ionicons } from "@expo/vector-icons";
import { ThemeMode } from "../providers/ThemeProvider";
import { THEME_MODES } from "../services/storage";

const getThemeIcon = (mode: ThemeMode) => {
  switch (mode) {
    case "system":
      return "contrast";
    case "light":
      return "sunny";
    case "dark":
      return "moon";
    default:
      return "contrast";
  }
};

export const ThemeToggle: React.FC = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const { t } = useLanguage();
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
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadows.sm,
        },
        option: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        optionLast: {
          borderBottomWidth: 0,
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
          textTransform: "capitalize",
          fontSize: theme.typography.sizes.base,
          color: theme.colors.text.primary,
          flex: 1,
        },
        radioButton: {
          width: 20,
          height: 20,
          borderRadius: theme.borderRadius.full,
          borderWidth: 2,
          borderColor: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
        },
        radioButtonSelected: {
          backgroundColor: theme.colors.primary,
        },
        radioButtonInner: {
          width: 8,
          height: 8,
          borderRadius: theme.borderRadius.sm,
          backgroundColor: theme.colors.surface,
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
      <Text style={styles.sectionTitle}>{t("Settings.theme")}</Text>

      <View style={styles.card}>
        {THEME_MODES.map((mode, index) => (
          <TouchableOpacity
            key={mode}
            style={[styles.option, index === 2 && styles.optionLast]}
            onPress={() => setThemeMode(mode)}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Ionicons
                  name={getThemeIcon(mode)}
                  size={20}
                  color={theme.colors.text.primary}
                />
              </View>
              <Text style={styles.optionText}>{t(`Theme.${mode}`)}</Text>
            </View>
            <View
              style={[
                styles.radioButton,
                themeMode === mode && styles.radioButtonSelected,
              ]}
            >
              {themeMode === mode && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.description}>{t("Settings.themeDescription")}</Text>
    </View>
  );
};
