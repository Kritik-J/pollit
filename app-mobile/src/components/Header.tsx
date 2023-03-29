import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";

const Header = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.headerBackgroundColor,
        },
      ]}
    >
      <Text style={styles.text}>Pollit.</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: (StatusBar.currentHeight as number) + 10,
  },

  text: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
});
