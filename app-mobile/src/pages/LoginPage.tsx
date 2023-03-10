import { StyleSheet, Text, ScrollView, StatusBar, View } from "react-native";
import React from "react";
import Button from "@components/Button";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import FormInput from "@src/components/FormInput";

const LoginPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const { theme } = useSelector((state: any) => state.ui);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <Text style={styles.text}>Welcome to Pollit</Text>

      <FormInput
        placeholder='Username or Email'
        containerStyle={{ marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      <FormInput
        placeholder='Password'
        containerStyle={{ marginBottom: 10 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        trailingIcon={
          <Octicons
            name={showPassword ? "eye-closed" : "eye"}
            size={24}
            color='black'
            onPress={toggleShowPassword}
            style={{
              marginRight: 10,
            }}
          />
        }
      />

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

export default LoginPage;

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
});
