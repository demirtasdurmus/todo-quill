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
  onLongPress?: () => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onToggle,
  onDelete,
  onLongPress,
}) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      <View style={styles.checkContainer}>
        <Checkbox
          value={item.done}
          onValueChange={() => onToggle(item.id)}
          style={styles.checkbox}
        />

        <Pressable
          onPress={() => onToggle(item.id)}
          style={styles.titleWrap}
          onLongPress={onLongPress}
        >
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
      </View>

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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: globalStyles.spacing.md,
    borderRadius: globalStyles.borderRadius.lg,
    marginBottom: globalStyles.spacing.sm,
    borderWidth: 1,
    ...globalStyles.shadows.sm,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "93%",
  },
  checkbox: {
    marginRight: globalStyles.spacing.sm,
    width: globalStyles.spacing.lg,
    height: globalStyles.spacing.lg,
  },
  titleWrap: {
    flex: 1,
    paddingRight: globalStyles.spacing.xs,
  },
  title: {
    fontSize: globalStyles.typography.sizes.base,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  done: {
    textDecorationLine: "line-through",
  },
  deleteBtn: {
    marginLeft: globalStyles.spacing.sm,
  },
});
