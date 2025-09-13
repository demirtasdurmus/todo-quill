import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLanguage, useTheme } from "@/hooks";
import { globalStyles } from "@/theme";
import { Filter } from "@/services/storage";

type NoTodosProps = {
  filter: Filter;
};

export const NoTodos: React.FC<NoTodosProps> = ({ filter }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const noTodoMessage = useMemo(() => {
    if (filter === "all") {
      return t("Todo.noTodos");
    } else if (filter === "active") {
      return t("Todo.noActiveTodos");
    } else if (filter === "done") {
      return t("Todo.noDoneTodos");
    }
  }, [filter, t]);

  const noTodoDescription = useMemo(() => {
    if (filter === "done") {
      return t("Todo.noDoneTodosDescription");
    }
    return t("Todo.noTodosDescription");
  }, [filter, t]);

  return (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
        {noTodoMessage}
      </Text>
      <Text
        style={[styles.emptySubtext, { color: theme.colors.text.secondary }]}
      >
        {noTodoDescription}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: globalStyles.spacing.xl,
    gap: globalStyles.spacing.lg,
  },
  emptyText: {
    textAlign: "center",
    fontSize: globalStyles.typography.sizes.base,
    marginBottom: globalStyles.spacing.xs,
  },
  emptySubtext: {
    textAlign: "center",
    fontSize: globalStyles.typography.sizes.sm,
  },
});
