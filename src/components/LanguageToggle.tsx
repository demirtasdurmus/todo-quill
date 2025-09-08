import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/use-theme";
import { useThemedStyles } from "../hooks/use-themed-styles";
import { useLanguage } from "../hooks/use-language";
import { Ionicons } from "@expo/vector-icons";
import { Language } from "../services/storage";
import { SUPPORTED_LANGUAGES } from "../services/storage";
import { TranslationFunction } from "../i18n";

const getLanguageIcon = (language: Language) => {
  switch (language) {
    case "en":
      return "language";
    case "tr":
      return "flag";
    default:
      return "language";
  }
};

const getLanguageName = (language: Language, t: TranslationFunction) => {
  switch (language) {
    case "en":
      return t("Language.english");
    case "tr":
      return t("Language.turkish");
    default:
      return t("Language.english");
  }
};

export const LanguageToggle: React.FC = () => {
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
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
      <Text style={styles.sectionTitle}>{t("Settings.language")}</Text>

      <View style={styles.card}>
        {SUPPORTED_LANGUAGES.map((lang, index) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.option,
              index === SUPPORTED_LANGUAGES.length - 1 && styles.optionLast,
            ]}
            onPress={() => setLanguage(lang)}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Ionicons
                  name={getLanguageIcon(lang)}
                  size={20}
                  color={theme.colors.text.primary}
                />
              </View>
              <Text style={styles.optionText}>{getLanguageName(lang, t)}</Text>
            </View>
            <View
              style={[
                styles.radioButton,
                language === lang && styles.radioButtonSelected,
              ]}
            >
              {language === lang && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.description}>
        {t("Settings.languageDescription")}
      </Text>
    </View>
  );
};
