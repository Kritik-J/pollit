import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pollit.</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#3F497F",
    paddingTop: (StatusBar.currentHeight as number) + 10,
  },

  text: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F7C04A",
  },
});
