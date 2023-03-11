import { StyleSheet, Text, ScrollView, StatusBar, View } from "react-native";
import React from "react";
import Button from "@components/Button";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import FormInput from "@src/components/FormInput";
import Typography from "@src/components/Typography";

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
      <Typography variant='h1'>Welcome to PollIt</Typography>

      <View style={{ height: 5 }} />

      <Typography variant='h3' style={{ color: "grey" }}>
        Login to your account
      </Typography>

      <View style={{ height: 30 }} />

      <FormInput
        placeholder='Username or Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      <View style={{ height: 10 }} />

      <FormInput
        placeholder='Password'
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

      <View style={{ height: 10 }} />

      <View>
        <Text
          style={{ textAlign: "right" }}
          onPress={() => console.log("Forgot password?")}
        >
          Forgot password?
        </Text>
      </View>

      <View style={{ height: 20 }} />

      <Button
        title='Login'
        onPress={() => {
          console.log("Email: ", email);
          console.log("Password: ", password);
        }}
      />

      <View style={{ height: 10 }} />

      <Button
        title='Register'
        onPress={() => {
          console.log("Register");
        }}
        backgroundColor='white'
        fontColor='black'
        borderWidth={1}
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
});
