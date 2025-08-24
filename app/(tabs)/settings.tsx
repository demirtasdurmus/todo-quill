import { ThemeToggle } from "../../src/components/ThemeToggle";
import { SafeAreaLayout } from "../../src/layouts/SafeArealLayout";
import { ScreenHeader } from "../../src/components/ScreenHeader";
import { AppLayout } from "../../src/layouts/AppLayout";

export default function SettingsScreen() {
  return (
    <AppLayout>
      <SafeAreaLayout>
        <ScreenHeader>Settings</ScreenHeader>

        <ThemeToggle />
      </SafeAreaLayout>
    </AppLayout>
  );
}
