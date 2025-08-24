import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../hooks/use-theme";
import { useThemedStyles } from "../hooks/use-themed-styles";
import appIcon from "../../assets/icon.png";
import profilePic from "../../assets/profile-pic.png";

type HeaderProps = {
  onProfilePress?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onProfilePress }) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(
    (theme) =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.md,
        },
        leftSection: {
          flexDirection: "row",
          alignItems: "center",
        },
        appName: {
          fontSize: theme.typography.sizes["2xl"],
          fontWeight: theme.typography.weights.bold,
          color: theme.colors.text.primary,
        },
        rightSection: {
          flexDirection: "row",
          alignItems: "center",
        },
        profileButton: {
          width: 32,
          height: 32,
          borderRadius: 16,
          overflow: "hidden",
        },
        iconImage: {
          width: 32,
          height: 32,
          borderRadius: 16,
        },
      }),
    theme
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={appIcon} style={styles.iconImage} resizeMode="cover" />

        <Text style={styles.appName}>TodoQuill</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <Image
            source={profilePic}
            style={styles.iconImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
