import React, { useMemo } from "react";
import Constants from "expo-constants";
import { useLanguage } from "@/hooks";
import { InfoList } from "./InfoList";
import { SettingsSection } from "./SettingsSection";

export const AppInfo: React.FC = () => {
  const { t } = useLanguage();

  const appVersion = Constants.expoConfig?.version || "1.0.0";

  const infoItems = useMemo(
    () => [
      {
        label: t("Settings.appVersion"),
        value: appVersion,
        icon: "build-outline" as const,
      },
    ],
    [t, appVersion]
  );

  return (
    <SettingsSection
      title={t("Settings.appInfo")}
      description={t("Settings.appInfoDescription")}
    >
      <InfoList items={infoItems} />
    </SettingsSection>
  );
};
