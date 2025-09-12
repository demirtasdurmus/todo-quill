import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks";
import { globalStyles } from "@/theme";
import appIcon from "@/assets/icon.png";

export const Header: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={appIcon} style={styles.iconImage} resizeMode="cover" />

        <Text style={[styles.appName, { color: theme.colors.text.primary }]}>
          TodoQuill
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: globalStyles.spacing.md,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: globalStyles.spacing.sm,
  },
  appName: {
    fontSize: globalStyles.typography.sizes["2xl"],
    fontWeight: globalStyles.typography.weights.bold,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileButton: {
    width: globalStyles.spacing.xl,
    height: globalStyles.spacing.xl,
    borderRadius: globalStyles.borderRadius.full,
    overflow: "hidden",
  },
  iconImage: {
    width: globalStyles.spacing.xl,
    height: globalStyles.spacing.xl,
    borderRadius: globalStyles.borderRadius.full,
  },
});
