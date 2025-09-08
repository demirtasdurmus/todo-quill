import { ThemeToggle } from "../../components/ThemeToggle";
import { LanguageToggle } from "../../components/LanguageToggle";
import { SafeAreaLayout } from "../../layouts/SafeArealLayout";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { AppLayout } from "../../layouts/AppLayout";
import { useLanguage } from "../../hooks";

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
