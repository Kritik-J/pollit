import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  SafeAreaView,
  Text,
} from "react-native";
import React from "react";
import Button from "@components/Button";
import { Octicons } from "@expo/vector-icons";
import FormInput from "@src/components/FormInput";
import Typography from "@src/components/Typography";
import useTheme from "@src/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { theme } = useTheme();

  const nav = useNavigation();

  function navigateToRegister() {
    nav.navigate("Register" as never);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundColor,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme.colors.backgroundColor,
        }}
      >
        <Typography variant='h1'>Welcome to PollIt</Typography>

        <View style={{ height: 5 }} />

        <Typography
          variant='h3'
          style={{
            color: "grey",
          }}
        >
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
              color={theme.colors.textInputIconColor}
              onPress={toggleShowPassword}
              style={{
                marginRight: 10,
              }}
            />
          }
        />

        <View style={{ height: 10 }} />

        <Typography
          variant='body'
          style={{
            textAlign: "right",
          }}
        >
          Forgot Password?
        </Typography>

        <View style={{ height: 20 }} />

        <Button
          title='Login'
          onPress={() => {
            console.log("Email: ", email);
            console.log("Password: ", password);
          }}
        />

        <View style={{ height: 40 }} />

        <Typography
          variant='body'
          style={{
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Text
            style={{ color: theme.colors.highlightColor }}
            onPress={navigateToRegister}
          >
            Register
          </Text>
        </Typography>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight as number) + 10 || 0,
    padding: 10,
  },
});
