import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";
import { Todo } from "@/utils";

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

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Checkbox
        value={item.done}
        onValueChange={() => onToggle(item.id)}
        style={styles.checkbox}
      />

      <Pressable style={styles.titleWrap} onPress={() => onToggle(item.id)}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text.primary },
            item.done && {
              ...styles.done,
              color: theme.colors.text.secondary,
              textDecorationColor: theme.colors.error,
            },
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </Pressable>

      <Pressable
        hitSlop={8}
        onPress={() => onDelete(item.id)}
        style={styles.deleteBtn}
      >
        <Ionicons
          name="trash-outline"
          size={globalStyles.typography.sizes.xl}
          color={theme.colors.error}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: globalStyles.spacing.md,
    borderRadius: globalStyles.borderRadius.lg,
    marginBottom: globalStyles.spacing.sm,
    borderWidth: 1,
    ...globalStyles.shadows.sm,
  },
  checkbox: {
    marginRight: globalStyles.spacing.sm,
    width: globalStyles.spacing.lg,
    height: globalStyles.spacing.lg,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: globalStyles.typography.sizes.base,
  },
  done: {
    textDecorationLine: "line-through",
  },
  deleteBtn: {
    marginLeft: globalStyles.spacing.sm,
  },
});
