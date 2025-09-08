import { SafeAreaLayout } from "../../layouts/SafeArealLayout";
import { Header } from "../../components/Header";
import { Todo } from "../../components/Todo";
import { AppLayout } from "../../layouts/AppLayout";

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
