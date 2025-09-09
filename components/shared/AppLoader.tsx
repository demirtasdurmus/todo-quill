import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const AppLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    transform: [{ scale: 1.2 }],
  },
});
