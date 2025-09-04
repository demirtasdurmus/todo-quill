export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

/**
 * Create a new todo
 * @param title - The title of the todo
 * @returns The new todo
 * @example
 * const todo = createTodo("Buy groceries");
 * console.log(todo);
 * // { id: "123", title: "Buy groceries", done: false, createdAt: 1714857600000 }
 */
export function createTodo(title: string): Todo {
  return {
    id: Math.random().toString(36).slice(2),
    title: title.trim(),
    done: false,
    createdAt: Date.now(),
  };
}
