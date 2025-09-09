import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme, useLanguage } from "@/hooks";
import { globalStyles } from "@/theme";

export const NoTodos: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
        {t("Todo.noTodos")}
      </Text>
      <Text
        style={[styles.emptySubtext, { color: theme.colors.text.secondary }]}
      >
        {t("Todo.noTodosDescription")}
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
