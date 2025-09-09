import { AppLayout, SafeAreaLayout } from "@/layouts";
import { Header } from "@/components/shared/Header";
import { Todo } from "@/components/todo";

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
