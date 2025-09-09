import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useTheme, useLanguage } from "@/hooks";
import { globalStyles } from "@/theme";

type TodoInputProps = {
  value: string;
  onChangeText: (_text: string) => void;
  onSubmit: () => void;
};

export const TodoInput: React.FC<TodoInputProps> = ({
  value,
  onChangeText,
  onSubmit,
}) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.border,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={t("Todo.addTodo")}
        placeholderTextColor={theme.colors.text.secondary}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        style={[styles.input, { color: theme.colors.text.primary }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: globalStyles.borderRadius.lg,
    paddingHorizontal: globalStyles.spacing.sm,
    paddingVertical: globalStyles.spacing.xs,
    marginBottom: globalStyles.spacing.sm,
    borderWidth: 1,
    marginTop: globalStyles.spacing.md,
    ...globalStyles.shadows.sm,
  },
  input: {
    flex: 1,
    fontSize: globalStyles.typography.sizes.lg,
    paddingVertical: globalStyles.spacing.xs,
  },
});
