import React from "react";
import { useLanguage } from "@/hooks";
import { ScreenHeader } from "../shared/ScreenHeader";
import { AppInfo } from "./AppInfo";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

export const Settings: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>
      <ScreenHeader>{t("Navigation.settings")}</ScreenHeader>

      <LanguageToggle />
      <ThemeToggle />
      <AppInfo />
    </>
  );
};
