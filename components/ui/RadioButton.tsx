import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";

export type RadioButtonProps = {
  selected: boolean;
  size?: number;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  size = 20,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.radioButton,
        { width: size, height: size, borderColor: theme.colors.primary },
        selected && { backgroundColor: theme.colors.primary },
      ]}
    >
      {selected && (
        <View
          style={[
            styles.radioButtonInner,
            {
              width: size * 0.4,
              height: size * 0.4,
              backgroundColor: theme.colors.surface,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    borderRadius: globalStyles.borderRadius.full,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    borderRadius: globalStyles.borderRadius.sm,
  },
});
