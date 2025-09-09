import React, { useMemo } from "react";
import { useLanguage } from "@/hooks";
import { Language, SUPPORTED_LANGUAGES } from "@/services/storage";
import { TranslationFunction } from "@/i18n";
import { ExpoVectorIcon } from "@/utils";
import { SettingsSection } from "./SettingsSection";
import { OptionList } from "./OptionList";

const getLanguageIcon = (language: Language): ExpoVectorIcon => {
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
  const { language, setLanguage, t } = useLanguage();

  const languageOptions = useMemo(
    () =>
      SUPPORTED_LANGUAGES.map((lang) => ({
        value: lang,
        label: getLanguageName(lang, t),
        icon: getLanguageIcon(lang),
      })),
    [t]
  );

  return (
    <SettingsSection
      title={t("Settings.language")}
      description={t("Settings.languageDescription")}
    >
      <OptionList
        options={languageOptions}
        selectedValue={language}
        onSelect={setLanguage}
      />
    </SettingsSection>
  );
};
