import { getLocales } from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import { Language, SUPPORTED_LANGUAGES } from "@/services/storage";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  // TODO: Optional for backward compatibility, CLEANUP IN THE NEXT MAJOR VERSION
  order?: number;
};

export type ExpoVectorIcon = keyof typeof Ionicons.glyphMap;

/**
 * Helper type to get all possible nested keys
 * @param ObjectType - The object type
 * @returns The nested key of the object
 * @example
 * const nestedKey = NestedKeyOf<{ a: { b: { c: string } } }>;
 * console.log(nestedKey);
 * // "a.b.c"
 */
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

/**
 * Create a new todo
 * @param title - The title of the todo
 * @param order - Optional order value (defaults to current timestamp for new todos)
 * @returns The new todo
 * @example
 * const todo = createTodo("Buy groceries");
 * console.log(todo);
 * // { id: "123", title: "Buy groceries", done: false, createdAt: 1714857600000, order: 1714857600000 }
 */
export function createTodo(title: string, order?: number): Todo {
  return {
    id: Math.random().toString(36).slice(2),
    title: title.trim(),
    done: false,
    createdAt: Date.now(),
    order: order ?? Date.now(), // Computed order or current timestamp
  };
}

/**
 * Detect the device language
 * @returns The device language or "en" if the language is not supported
 * @example
 * const language = detectDeviceLanguage();
 * console.log(language);
 * // "en" or "tr"
 */
export function detectDeviceLanguage(): Language {
  const deviceLocale = getLocales()[0];
  const languageCode = deviceLocale?.languageCode;

  if (languageCode) {
    if (SUPPORTED_LANGUAGES.includes(languageCode as Language)) {
      return languageCode as Language;
    }
  }
  return "en";
}

/**
 * Sort todos by order, handling backward compatibility for todos without order
 * @param todos - Array of todos to sort
 * @returns Sorted array of todos
 * @example
 * const sortedTodos = sortTodosByOrder(todos);
 */
export function sortTodosByOrder(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    /**
     * Handle backward compatibility: if order is undefined, use createdAt
     * TODO: CLEANUP IN THE NEXT MAJOR VERSION
     */
    const orderA = a?.order ?? a.createdAt;
    const orderB = b?.order ?? b.createdAt;
    return orderA - orderB;
  });
}
