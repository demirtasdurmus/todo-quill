import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/use-theme";
import { useThemedStyles } from "../../hooks/use-themed-styles";

export type RadioButtonProps = {
  selected: boolean;
  size?: number;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  size = 20,
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        radioButton: {
          width: size,
          height: size,
          borderRadius: theme.borderRadius.full,
          borderWidth: 2,
          borderColor: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
        },
        radioButtonSelected: {
          backgroundColor: theme.colors.primary,
        },
        radioButtonInner: {
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: theme.borderRadius.sm,
          backgroundColor: theme.colors.surface,
        },
      }),
    theme
  );

  return (
    <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
      {selected && <View style={styles.radioButtonInner} />}
    </View>
  );
};
