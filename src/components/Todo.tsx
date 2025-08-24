import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  createTodo,
  Filter,
  loadTodos,
  saveTodos,
  TTodo,
} from "../services/storage";
import { TodoItem } from "../components/TodoItem";
import { Button } from "../components/Button";
import { useTheme } from "../hooks/use-theme";
import { useThemedStyles } from "../hooks/use-themed-styles";

export const Todo: React.FC = () => {
  const { theme } = useTheme();
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);
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
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        inputRow: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderWidth: 1,
          borderColor: theme.colors.border,
          ...theme.shadows.sm,
        },
        input: {
          flex: 1,
          fontSize: theme.typography.sizes.base,
          paddingVertical: theme.spacing.xs,
          color: theme.colors.text.primary,
        },
        filters: {
          marginTop: theme.spacing.sm,
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.xs,
        },
        meta: {
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.text.secondary,
          marginRight: theme.spacing.sm,
        },
        clear: {
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.error,
        },
        empty: {
          textAlign: "center",
          marginTop: theme.spacing.xl,
          color: theme.colors.text.secondary,
        },
      }),
    theme
  );

  const handleAddTodo = () => {
    const title = text.trim();
    if (!title) return;
    setTodos((prev) => [createTodo(title), ...prev]);
    setText("");
  };

  const handleToggleDone = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleRemoveTodo = (id: string) => {
    const t = todos.find((x) => x.id === id);
    if (!t) return;
    Alert.alert("Delete todo", `Delete "${t.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTodos((prev) => prev.filter((x) => x.id !== id)),
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
        onPress: () => setTodos((prev) => prev.filter((t) => !t.done)),
      },
    ]);
  };

  useEffect(() => {
    (async () => setTodos(await loadTodos()))();
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <View>
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a todo…"
          placeholderTextColor={theme.colors.text.secondary}
          returnKeyType="done"
          onSubmitEditing={handleAddTodo}
          style={styles.input}
        />
      </View>

      <View style={styles.filters}>
        <Button
          label="All"
          active={filter === "all"}
          onPress={() => setFilter("all")}
        />
        <Button
          label="Active"
          active={filter === "active"}
          onPress={() => setFilter("active")}
        />
        <Button
          label="Done"
          active={filter === "done"}
          onPress={() => setFilter("done")}
        />
        <View style={{ flex: 1 }} />
        <Text style={styles.meta}>{remaining} left</Text>
        <Text style={styles.clear} onPress={handleClearDone}>
          Clear done
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 6, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={handleToggleDone}
            onDelete={handleRemoveTodo}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No todos. Add one above!</Text>
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};
