import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || "large"} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "'rgba(52, 52, 52, 0.3)"
  }
});

export { Spinner };
