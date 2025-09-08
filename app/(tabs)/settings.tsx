import { ThemeToggle } from "../../src/components/ThemeToggle";
import { LanguageToggle } from "../../src/components/LanguageToggle";
import { SafeAreaLayout } from "../../src/layouts/SafeArealLayout";
import { ScreenHeader } from "../../src/components/ScreenHeader";
import { AppLayout } from "../../src/layouts/AppLayout";
import { useLanguage } from "../../src/hooks";

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
