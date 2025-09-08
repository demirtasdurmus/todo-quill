import React from "react";
import { useLanguage } from "../hooks/use-language";
import { useTheme } from "../hooks/use-theme";
import { ThemeMode } from "../providers/ThemeProvider";
import { THEME_MODES } from "../services/storage";
import { SettingsSection } from "./SettingsSection";
import { OptionList } from "./ui";
import { ExpoVectorIcon } from "../utils";

const getThemeIcon = (mode: ThemeMode): ExpoVectorIcon => {
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
  const { themeMode, setThemeMode } = useTheme();
  const { t } = useLanguage();

  const themeOptions = THEME_MODES.map((mode) => ({
    value: mode,
    label: t(`Theme.${mode}`),
    icon: getThemeIcon(mode),
  }));

  return (
    <SettingsSection
      title={t("Settings.theme")}
      description={t("Settings.themeDescription")}
    >
      <OptionList
        options={themeOptions}
        selectedValue={themeMode}
        onSelect={setThemeMode}
      />
    </SettingsSection>
  );
};
