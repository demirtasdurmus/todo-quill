import React from "react";
import { StyleSheet, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";
import { globalStyles } from "@/theme";
import type { Todo } from "@/utils";
import { Filter } from "@/services/storage";
import { NoTodos } from "./NoTodos";
import { TodoItem } from "./TodoItem";

type DraggableTodoListProps = {
  todos: Todo[];
  filter: Filter;
  onToggleTodo: (_id: string) => void;
  onDeleteTodo: (_id: string) => void;
  onReorderTodos: (_todos: Todo[]) => void;
};

export const DraggableTodoList: React.FC<DraggableTodoListProps> = ({
  todos,
  filter,
  onToggleTodo,
  onDeleteTodo,
  onReorderTodos,
}) => {
  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={todos}
        onDragEnd={({ data }) => onReorderTodos(data)}
        onDragBegin={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag }: RenderItemParams<Todo>) => {
          return (
            <ScaleDecorator>
              <TodoItem
                item={item}
                onToggle={onToggleTodo}
                onDelete={onDeleteTodo}
                onLongPress={drag}
              />
            </ScaleDecorator>
          );
        }}
        activationDistance={24}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<NoTodos filter={filter} />}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: globalStyles.spacing.sm,
  },
});
