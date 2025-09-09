import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { globalStyles } from "@/theme";
import type { Todo } from "@/utils";
import { NoTodos } from "./NoTodos";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (_id: string) => void;
  onDeleteTodo: (_id: string) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
}) => {
  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <TodoItem item={item} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
      )}
      ListEmptyComponent={<NoTodos />}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: globalStyles.spacing.sm,
  },
});
