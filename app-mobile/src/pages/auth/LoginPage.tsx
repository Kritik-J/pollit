// TODO: Create reusable component for error messages

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
import useAuth from "@src/hooks/useAuth";
import { useAppDispatch } from "@src/hooks/useReduce";
import { clearError, loginUser } from "@src/redux/authSlice";
import { checkNull } from "@src/utils/validators";

const LoginPage = () => {
  const [formInput, setFormInput] = React.useState({
    userNameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    userNameOrEmail: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const { error, isLoading } = useAuth();

  const handleFormInput = (key: string, value: string) => {
    setFormInput({
      ...formInput,
      [key]: value,
    });

    setErrors({ ...errors, [key]: "" });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { theme } = useTheme();

  const nav = useNavigation();

  function navigateToRegister() {
    nav.navigate("Register" as never);
  }

  const dispatch = useAppDispatch();

  function handleLogin() {
    if (checkNull(formInput.userNameOrEmail)) {
      setErrors({
        ...errors,
        userNameOrEmail: "Email is required",
      });
      return;
    }

    if (checkNull(formInput.password)) {
      setErrors({
        ...errors,
        password: "Password is required",
      });
      return;
    }

    if (errors.userNameOrEmail !== "" || errors.password !== "") {
      return;
    }

    dispatch(loginUser(formInput));
  }

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error]);

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
        {/* Header */}

        <Typography variant="h1">Welcome to PollIt</Typography>

        <View style={{ height: 5 }} />

        <Typography
          variant="h3"
          style={{
            color: "grey",
          }}
        >
          Login to your account
        </Typography>

        <View style={{ height: 30 }} />

        {/* Username or Email input */}

        <FormInput
          placeholder="Username or Email"
          value={formInput.userNameOrEmail}
          onChangeText={(text) => handleFormInput("userNameOrEmail", text)}
          keyboardType="email-address"
          InputProps={{
            autoCapitalize: "none",
          }}
          status={errors.userNameOrEmail !== "" ? "error" : ""}
        />
        {errors.userNameOrEmail !== "" && (
          <Typography
            variant="body"
            style={{ color: theme.colors.errorColor, marginTop: 10 }}
          >
            {errors.userNameOrEmail}
          </Typography>
        )}

        <View style={{ height: 20 }} />

        {/* Password input */}

        <FormInput
          placeholder="Password"
          value={formInput.password}
          onChangeText={(text) => handleFormInput("password", text)}
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
          InputProps={{
            secureTextEntry: !showPassword,
          }}
          status={errors.password !== "" ? "error" : ""}
        />
        {errors.password !== "" && (
          <Typography
            variant="body"
            style={{ color: theme.colors.errorColor, marginTop: 10 }}
          >
            {errors.password}
          </Typography>
        )}

        <View style={{ height: 20 }} />

        {/* Forgot Password */}

        <Typography
          variant="body"
          style={{
            textAlign: "right",
          }}
        >
          Forgot Password?
        </Typography>

        <View style={{ height: 20 }} />

        {/* Login Button */}

        <Button
          title="Login"
          onPress={handleLogin}
          loading={isLoading}
          disabled={
            errors.userNameOrEmail !== "" || errors.password !== "" || isLoading
          }
        />

        {/* Error Message */}

        {error && (
          <Typography
            variant="body"
            style={{
              textAlign: "center",
              color: theme.colors.errorColor,
              marginTop: 40,
            }}
          >
            {error}
          </Typography>
        )}

        <View style={{ height: 40 }} />

        {/* Footer */}

        <Typography
          variant="body"
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
