import { SafeAreaLayout } from "../../src/layouts/SafeArealLayout";
import { Header } from "../../src/components/Header";
import { Todo } from "../../src/components/Todo";
import { AppLayout } from "../../src/layouts/AppLayout";

export default function HomeScreen() {
  return (
    <AppLayout>
      <SafeAreaLayout>
        <Header />

        <Todo />
      </SafeAreaLayout>
    </AppLayout>
  );
}
