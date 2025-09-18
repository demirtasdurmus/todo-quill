import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage, useTheme } from "@/hooks";
import { globalStyles } from "@/theme";

type ReorderHintProps = {
  onDismiss(): void;
};

export const ReorderHint: React.FC<ReorderHintProps> = ({ onDismiss }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onDismiss}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.text.primary,
          },
        ]}
      >
        {t("Todo.reorderHint")}
      </Text>

      <Text>
        <Ionicons
          name="close"
          size={globalStyles.typography.sizes.base}
          color={theme.colors.text.secondary}
        />
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: globalStyles.spacing.sm,
    marginBottom: globalStyles.spacing.xs,
    paddingVertical: globalStyles.spacing.sm,
    paddingHorizontal: globalStyles.spacing.md,
    borderRadius: globalStyles.borderRadius.lg,
    borderWidth: 1,
    ...globalStyles.shadows.sm,
  },
  text: {
    fontSize: globalStyles.typography.sizes.sm,
  },
});
