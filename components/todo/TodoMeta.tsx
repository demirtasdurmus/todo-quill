import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLanguage, useTheme } from "@/hooks";
import { globalStyles } from "@/theme";

type TodoMetaProps = {
  remainingCount: number;
  onClearDone: () => void;
};

export const TodoMeta: React.FC<TodoMetaProps> = ({
  remainingCount,
  onClearDone,
}) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.success }]}>
        {t("Common.itemsLeft", { count: remainingCount })}
      </Text>

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
    marginTop: globalStyles.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: globalStyles.typography.sizes.sm,
  },
  clearAction: {
    fontSize: globalStyles.typography.sizes.sm,
  },
});
