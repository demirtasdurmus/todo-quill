import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { TodoItem } from "./TodoItem";
import { Button } from "./Button";
import { useTheme } from "../hooks/use-theme";
import { useThemedStyles } from "../hooks/use-themed-styles";
import { useTodoReducer } from "../hooks/useTodoReducer";

export const Todo: React.FC = () => {
  const { theme } = useTheme();
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
  } = useTodoReducer();

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
          fontSize: theme.typography.sizes["xl"],
          paddingVertical: theme.spacing.xs,
          color: theme.colors.text.primary,
        },
        filters: {
          marginTop: theme.spacing.md,
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
        contentContainer: {
          paddingTop: theme.spacing.lg,
        },
        empty: {
          textAlign: "center",
          marginTop: theme.spacing.xl,
          color: theme.colors.text.secondary,
        },
      }),
    theme
  );

  return (
    <>
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
        contentContainerStyle={styles.contentContainer}
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
        scrollEnabled={true}
      />
    </>
  );
};
