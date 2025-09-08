import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { Todo } from "../../utils";
import { useTheme, useThemedStyles } from "../../hooks";

type TodoItemProps = {
  item: Todo;
  onToggle(_id: string): void;
  onDelete(_id: string): void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onToggle,
  onDelete,
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        row: {
          flexDirection: "row",
          alignItems: "center",
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          marginBottom: theme.spacing.sm,
          borderWidth: 1,
          borderColor: theme.colors.border,
          ...theme.shadows.sm,
        },
        checkbox: {
          marginRight: theme.spacing.sm,
          width: 22,
          height: 22,
        },
        titleWrap: {
          flex: 1,
        },
        title: {
          fontSize: theme.typography.sizes.base,
          color: theme.colors.text.primary,
        },
        done: {
          textDecorationLine: "line-through",
          color: theme.colors.text.secondary,
        },
        delete: {
          marginLeft: theme.spacing.sm,
        },
        deleteText: {
          fontSize: theme.typography.sizes.lg,
          color: theme.colors.error,
        },
      }),
    theme
  );

  return (
    <View style={styles.row}>
      <Checkbox
        value={item.done}
        onValueChange={() => onToggle(item.id)}
        style={styles.checkbox}
      />
      <Pressable style={styles.titleWrap} onPress={() => onToggle(item.id)}>
        <Text
          style={[styles.title, item.done && styles.done]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </Pressable>
      <Pressable
        hitSlop={8}
        onPress={() => onDelete(item.id)}
        style={styles.delete}
      >
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </View>
  );
};
