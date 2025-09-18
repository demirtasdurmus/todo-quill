import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useLanguage, useTheme } from "@/hooks";
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
  const inputRef = useRef<TextInput>(null);

  const onSubmitWithFocusBack = () => {
    onSubmit();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

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
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={t("Todo.addTodo")}
        placeholderTextColor={theme.colors.text.secondary}
        returnKeyType="done"
        onSubmitEditing={onSubmitWithFocusBack}
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
