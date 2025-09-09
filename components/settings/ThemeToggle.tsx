import React, { useMemo } from "react";
import { useLanguage, useTheme } from "@/hooks";
import { ThemeMode } from "@/providers";
import { THEME_MODES } from "@/services/storage";
import { ExpoVectorIcon } from "@/utils";
import { SettingsSection } from "./SettingsSection";
import { OptionList } from "./OptionList";

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
