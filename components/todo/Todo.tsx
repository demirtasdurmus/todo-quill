import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "@/components/ui";
import {
  useTheme,
  useThemedStyles,
  useLanguage,
  useTodoReducer,
} from "@/hooks";
import { TodoItem } from "./TodoItem";

export const Todo: React.FC = () => {
  const { theme } = useTheme();
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
        actions: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        filterActions: {
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.xs,
        },
        clearAction: {
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.error,
        },
        metaContainer: {
          marginTop: theme.spacing.sm,
        },
        metaText: {
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.success,
        },
        inputRow: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.border,
          borderRadius: theme.borderRadius.lg,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          marginBottom: theme.spacing.sm,
          borderWidth: 1,
          marginTop: theme.spacing.md,
          borderColor: theme.colors.border,
          ...theme.shadows.sm,
        },
        input: {
          flex: 1,
          fontSize: theme.typography.sizes["xl"],
          paddingVertical: theme.spacing.xs,
          color: theme.colors.text.primary,
        },
        contentContainer: {
          paddingTop: theme.spacing.sm,
        },
        contentEmpty: {
          textAlign: "center",
          marginTop: theme.spacing.xl,
          color: theme.colors.text.secondary,
        },
      }),
    theme
  );

  return (
    <>
      <View style={styles.actions}>
        <View style={styles.filterActions}>
          <Button
            label={t("Common.all")}
            active={filter === "all"}
            onPress={() => setFilter("all")}
          />
          <Button
            label={t("Common.active")}
            active={filter === "active"}
            onPress={() => setFilter("active")}
          />
          <Button
            label={t("Common.done")}
            active={filter === "done"}
            onPress={() => setFilter("done")}
          />
        </View>

        <Text style={styles.clearAction} onPress={handleClearDone}>
          {t("Common.clearDone")}
        </Text>
      </View>

      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>
          {t("Common.itemsLeft", { count: remaining })}
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={t("Todo.addTodo")}
          placeholderTextColor={theme.colors.text.secondary}
          returnKeyType="done"
          onSubmitEditing={handleAddTodo}
          style={styles.input}
        />
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
          <View>
            <Text style={styles.contentEmpty}>{t("Todo.noTodos")}</Text>
            <Text style={styles.contentEmpty}>
              {t("Todo.noTodosDescription")}
            </Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      />
    </>
  );
};
