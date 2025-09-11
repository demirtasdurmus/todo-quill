import React from "react";
import { StyleSheet, View } from "react-native";
import { useLanguage } from "@/hooks";
import { globalStyles } from "@/theme";
import { Button } from "@/components/ui";

type FilterType = "all" | "active" | "done";

type TodoFiltersProps = {
  currentFilter: FilterType;
  onFilterChange: (_filter: FilterType) => void;
};

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: globalStyles.spacing.xs,
  },
});
