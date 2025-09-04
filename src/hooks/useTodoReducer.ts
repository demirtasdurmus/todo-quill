import { useReducer, useEffect } from "react";
import { Alert } from "react-native";
import { Filter, loadTodos, saveTodos } from "../services/storage";
import { createTodo, Todo } from "../utils";

type TodoState = {
  todos: Todo[];
  text: string;
  filter: Filter;
};

type TodoAction =
  | { type: "SET_TEXT"; payload: string }
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "CLEAR_DONE" }
  | { type: "SET_FILTER"; payload: Filter }
  | { type: "LOAD_TODOS"; payload: Todo[] };

const initialState: TodoState = {
  todos: [],
  text: "",
  filter: "all",
};

export const useTodoReducer = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, text, filter } = state;

  const setText = (value: string) => {
    dispatch({ type: "SET_TEXT", payload: value });
  };

  const setFilter = (filter: Filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  const handleAddTodo = () => {
    dispatch({ type: "ADD_TODO", payload: text });
  };

  const handleToggleDone = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const handleRemoveTodo = (id: string) => {
    const t = todos.find((x) => x.id === id);
    if (!t) return;
    Alert.alert("Delete todo", `Delete "${t.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch({ type: "DELETE_TODO", payload: id }),
      },
    ]);
  };

  const handleClearDone = () => {
    if (!todos.some((t) => t.done)) return;
    Alert.alert("Clear completed", "Remove all completed todos?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => dispatch({ type: "CLEAR_DONE" }),
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      const loadedTodos = await loadTodos();
      dispatch({ type: "LOAD_TODOS", payload: loadedTodos });
    })();
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return {
    todos,
    text,
    filter,
    handleAddTodo,
    handleToggleDone,
    handleRemoveTodo,
    handleClearDone,
    setText,
    setFilter,
  };
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        text: action.payload,
      };

    case "ADD_TODO":
      if (!action.payload.trim()) return state;
      return {
        ...state,
        todos: [createTodo(action.payload.trim()), ...state.todos],
        text: "",
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((x) => x.id !== action.payload),
      };

    case "CLEAR_DONE":
      return {
        ...state,
        todos: state.todos.filter((t) => !t.done),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "LOAD_TODOS":
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
}
