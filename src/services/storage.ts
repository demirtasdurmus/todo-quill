import AsyncStorage from "@react-native-async-storage/async-storage";

export type Filter = "all" | "active" | "done";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

const KEY = "todos:v1";

export async function loadTodos(): Promise<Todo[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (t) =>
          typeof t?.id === "string" &&
          typeof t?.title === "string" &&
          typeof t?.done === "boolean"
      ) as Todo[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(todos));
  } catch {
    // ignore save errors
  }
}

export function createTodo(title: string): Todo {
  return {
    id: Math.random().toString(36).slice(2),
    title: title.trim(),
    done: false,
    createdAt: Date.now(),
  };
}
