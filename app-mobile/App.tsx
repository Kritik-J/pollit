import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import LoginrPage from "./src/pages/LoginPage";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginrPage />

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
