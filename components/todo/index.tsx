import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage, useTodoReducer } from "@/hooks";
import { loadReorderHintSeen, saveReorderHintSeen } from "@/services/storage";
import { DraggableTodoList } from "./DraggableTodoList";
import { ReorderHint } from "./ReorderHint";
import { TodoFilters } from "./TodoFilters";
import { TodoInput } from "./TodoInput";
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
    handleReorderTodos,
    setText,
    setFilter,
  } = useTodoReducer(t);
  const [showHint, setShowHint] = useState(false);

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

  const dismissHint = useCallback(() => {
    setShowHint(false);
    saveReorderHintSeen();
  }, []);

  useEffect(() => {
    loadReorderHintSeen().then((seen) => {
      if (!seen) setShowHint(true);
    });
  }, []);

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

      {showHint && <ReorderHint onDismiss={dismissHint} />}

      <DraggableTodoList
        filter={filter}
        todos={filtered}
        onToggleTodo={handleToggleDone}
        onDeleteTodo={handleRemoveTodo}
        onReorderTodos={handleReorderTodos}
      />
    </>
  );
};
