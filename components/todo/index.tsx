import React, { useMemo } from "react";
import { useLanguage, useTodoReducer } from "@/hooks";
import { TodoFilters } from "./TodoFilters";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { TodoMeta } from "./TodoMeta";

export const Todo: React.FC = () => {
  const { t } = useLanguage();
  const {
    todos,
    text,
    filter,
    handleAddTodo,
    handleToggleDone,
    handleRemoveTodo,
    handleClearDone,
    setText,
    setFilter,
  } = useTodoReducer(t);

  const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);
  const done = useMemo(() => todos.filter((t) => t.done).length, [todos]);
  const filtered = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.done);
      case "done":
        return todos.filter((t) => t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <>
      <TodoFilters currentFilter={filter} onFilterChange={setFilter} />

      <TodoMeta
        remainingCount={remaining}
        doneCount={done}
        filter={filter}
        onClearDone={handleClearDone}
      />

      <TodoInput value={text} onChangeText={setText} onSubmit={handleAddTodo} />

      <TodoList
        filter={filter}
        todos={filtered}
        onToggleTodo={handleToggleDone}
        onDeleteTodo={handleRemoveTodo}
      />
    </>
  );
};
