import React, { PropsWithChildren } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";

export const ScreenHeader: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: globalStyles.spacing.md,
    paddingVertical: globalStyles.spacing.sm,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  title: {
    fontSize: globalStyles.typography.sizes["xl"],
    fontWeight: globalStyles.typography.weights.bold,
  },
});
