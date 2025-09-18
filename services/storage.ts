import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "@/utils";

export type Filter = "all" | "active" | "done";
export type Language = "en" | "tr";
export type ThemeMode = "light" | "dark" | "system";

const TODO_KEY = "todos:v1";
const THEME_KEY = "theme:v1";
const LANGUAGE_KEY = "language:v1";

export const THEME_MODES: ThemeMode[] = ["system", "light", "dark"];
export const SUPPORTED_LANGUAGES: Language[] = ["en", "tr"];

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
          typeof t?.done === "boolean" &&
          typeof t?.createdAt === "number" &&
          // TODO: CLEANUP THIS CHECK IN THE NEXT MAJOR VERSION, THIS IS FOR BACKWARD COMPATIBILITY
          (t?.order === undefined || typeof t?.order === "number")
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

export async function loadLanguage(): Promise<Language | null> {
  try {
    const raw = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "string" &&
      SUPPORTED_LANGUAGES.includes(parsed as Language)
    ) {
      return parsed as Language;
    }
    return null;
  } catch {
    return null;
  }
}

export async function saveLanguage(language: Language): Promise<void> {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, JSON.stringify(language));
  } catch {
    // TODO: Handle save errors
  }
}
