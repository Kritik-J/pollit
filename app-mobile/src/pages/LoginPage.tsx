import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  View,
} from "react-native";
import React from "react";
import Button from "@components/Button";
import { Octicons } from "@expo/vector-icons";

const LoginrPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Enter your email address to login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Password'
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        {showPassword ? (
          <Octicons
            name='eye-closed'
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        ) : (
          <Octicons
            name='eye'
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{ textAlign: "right" }}
          onPress={() => console.log("Forgot password?")}
        >
          Forgot password?
        </Text>
      </View>

      <Button
        title='Login'
        onPress={() => {
          console.log("Email: ", email);
          console.log("Password: ", password);
        }}
        buttonStyle={{ marginBottom: 10 }}
      />

      <Button
        title='Register'
        onPress={() => {
          console.log("Register");
        }}
        backgroundColor='white'
        borderColor='black'
        fontColor='black'
      />
    </ScrollView>
  );
};

export default LoginrPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    padding: 10,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
  },

  input: {
    padding: 10,
    flex: 1,
  },

  icon: {
    padding: 10,
    fontSize: 24,
    color: "black",
  },
});
