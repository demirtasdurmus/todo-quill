import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../utils";
import { ThemeMode } from "../providers/ThemeProvider";

export type Filter = "all" | "active" | "done";

const TODO_KEY = "todos:v1";
const THEME_KEY = "theme:v1";
export const THEME_MODES: ThemeMode[] = ["system", "light", "dark"];

export async function loadTodos(): Promise<Todo[]> {
  try {
    const raw = await AsyncStorage.getItem(TODO_KEY);
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
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(todos));
  } catch {
    // TODO: Handle save errors
  }
}

export async function loadThemeMode(): Promise<ThemeMode> {
  try {
    const raw = await AsyncStorage.getItem(THEME_KEY);
    if (!raw) return "system";
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "string" &&
      THEME_MODES.includes(parsed as ThemeMode)
    ) {
      return parsed as ThemeMode;
    }
    return "system";
  } catch {
    return "system";
  }
}

export async function saveThemeMode(themeMode: ThemeMode): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(themeMode));
  } catch {
    // TODO: Handle save errors
  }
}
