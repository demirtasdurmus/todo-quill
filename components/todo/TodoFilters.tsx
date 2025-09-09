import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "@/components/ui";
import { useTheme, useLanguage } from "@/hooks";
import { globalStyles } from "@/theme";

type FilterType = "all" | "active" | "done";

type TodoFiltersProps = {
  currentFilter: FilterType;
  onFilterChange: (_filter: FilterType) => void;
  onClearDone: () => void;
};

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  onClearDone,
}) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.filterActions}>
        <Button
          label={t("Common.all")}
          active={currentFilter === "all"}
          onPress={() => onFilterChange("all")}
        />
        <Button
          label={t("Common.active")}
          active={currentFilter === "active"}
          onPress={() => onFilterChange("active")}
        />
        <Button
          label={t("Common.done")}
          active={currentFilter === "done"}
          onPress={() => onFilterChange("done")}
        />
      </View>

      <Text
        style={[styles.clearAction, { color: theme.colors.error }]}
        onPress={onClearDone}
      >
        {t("Common.clearDone")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: globalStyles.spacing.xs,
  },
  clearAction: {
    fontSize: globalStyles.typography.sizes.sm,
    width: "30%",
    textAlign: "center",
  },
});
