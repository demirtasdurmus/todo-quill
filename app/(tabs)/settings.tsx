import { AppLayout, SafeAreaLayout } from "@/layouts";
import { useLanguage } from "@/hooks";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { ThemeToggle } from "@/components/settings/ThemeToggle";
import { LanguageToggle } from "@/components/settings/LanguageToggle";

export default function SettingsScreen() {
  const { t } = useLanguage();

  return (
    <AppLayout>
      <SafeAreaLayout>
        <ScreenHeader>{t("Navigation.settings")}</ScreenHeader>

        <LanguageToggle />
        <ThemeToggle />
      </SafeAreaLayout>
    </AppLayout>
  );
}
