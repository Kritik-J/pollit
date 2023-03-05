import store from "@src/redux/store";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import HomePage from "@pages/HomePage";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style='auto' />

        <HomePage />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
