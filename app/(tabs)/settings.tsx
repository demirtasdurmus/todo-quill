import { AppLayout, SafeAreaLayout } from "@/layouts";
import { Settings } from "@/components/settings";

export default function SettingsScreen() {
  return (
    <AppLayout>
      <SafeAreaLayout>
        <Settings />
      </SafeAreaLayout>
    </AppLayout>
  );
}
