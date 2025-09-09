import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme, useLanguage } from "@/hooks";
import { globalStyles } from "@/theme";

type TodoMetaProps = {
  remainingCount: number;
};

export const TodoMeta: React.FC<TodoMetaProps> = ({ remainingCount }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.success }]}>
        {t("Common.itemsLeft", { count: remainingCount })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: globalStyles.spacing.sm,
  },
  text: {
    fontSize: globalStyles.typography.sizes.sm,
  },
});
