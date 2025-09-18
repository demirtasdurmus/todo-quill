import React, { useMemo } from "react";
import { useLanguage, useTheme } from "@/hooks";
import { ExpoVectorIcon } from "@/utils";
import { THEME_MODES, ThemeMode } from "@/services/storage";
import { OptionList } from "./OptionList";
import { SettingsSection } from "./SettingsSection";

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

  const themeOptions = useMemo(
    () =>
      THEME_MODES.map((mode) => ({
        value: mode,
        label: t(`Theme.${mode}`),
        icon: getThemeIcon(mode),
      })),
    [t]
  );

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
