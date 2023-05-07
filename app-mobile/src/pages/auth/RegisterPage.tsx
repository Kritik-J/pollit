// TODO: Create reusable component for error messages

import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";
import Button from "@components/Button";
import FormInput from "@src/components/FormInput";
import Typography from "@src/components/Typography";
import useTheme from "@src/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { useAppDispatch } from "@src/hooks/useReduce";
import { registerUser, clearError } from "@src/redux/authSlice";
import useAuth from "@src/hooks/useAuth";
import { checkEmail, checkLength, checkNull } from "@src/utils/validators";

const RegisterPage = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [formInput, setFormInput] = React.useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const { error, isLoading } = useAuth();

  const nav = useNavigation();

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function navigateToLogin() {
    nav.navigate("Login" as never);
  }

  const handleFormInput = (key: string, value: string) => {
    setFormInput({
      ...formInput,
      [key]: value,
    });

    setErrors({ ...errors, [key]: "" });
  };

  function handleRegister() {
    if (checkNull(formInput.name)) {
      setErrors({
        ...errors,
        name: "Name is required",
      });
      return;
    }

    if (checkNull(formInput.userName)) {
      setErrors({
        ...errors,
        userName: "Username is required",
      });
      return;
    }

    if (checkNull(formInput.email)) {
      setErrors({
        ...errors,
        email: "Email is required",
      });
      return;
    }

    if (checkEmail(formInput.email)) {
      setErrors({
        ...errors,
        email: "Email is invalid",
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

    if (checkLength(formInput.password, 8)) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters",
      });
      return;
    }

    if (
      errors.email !== "" ||
      errors.name !== "" ||
      errors.userName !== "" ||
      errors.password !== ""
    ) {
      return;
    }

    dispatch(registerUser(formInput));
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
          Create an account to get started
        </Typography>

        <View style={{ height: 30 }} />

        {/* Name input */}

        <FormInput
          placeholder="Name"
          value={formInput.name}
          onChangeText={(text) => handleFormInput("name", text)}
          status={errors.name !== "" ? "error" : ""}
        />
        {errors.name !== "" && (
          <Typography
            variant="body"
            style={{ color: theme.colors.errorColor, marginTop: 10 }}
          >
            {errors.name}
          </Typography>
        )}

        <View style={{ height: 20 }} />

        {/* Username input */}

        <FormInput
          placeholder="Username"
          value={formInput.userName}
          onChangeText={(text) => handleFormInput("userName", text)}
          InputProps={{
            autoCapitalize: "none",
          }}
          status={errors.userName !== "" ? "error" : ""}
        />
        {errors.userName !== "" && (
          <Typography
            variant="body"
            style={{ color: theme.colors.errorColor, marginTop: 10 }}
          >
            {errors.userName}
          </Typography>
        )}

        <View style={{ height: 20 }} />

        {/* Email input */}

        <FormInput
          placeholder="Email"
          value={formInput.email}
          onChangeText={(text) => handleFormInput("email", text)}
          InputProps={{
            autoCapitalize: "none",
          }}
          status={errors.email !== "" ? "error" : ""}
        />
        {errors.email !== "" && (
          <Typography
            variant="body"
            style={{ color: theme.colors.errorColor, marginTop: 10 }}
          >
            {errors.email}
          </Typography>
        )}

        <View style={{ height: 20 }} />

        {/* Password input */}

        <FormInput
          placeholder="Password"
          value={formInput.password}
          onChangeText={(text) => handleFormInput("password", text)}
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

        {/* Register button */}

        <Button
          title="Register"
          onPress={handleRegister}
          loading={isLoading}
          disabled={
            errors.email !== "" ||
            errors.name !== "" ||
            errors.userName !== "" ||
            errors.password !== "" ||
            isLoading
          }
        />

        {/* Error message */}

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
          Already have an account?{" "}
          <Text
            style={{ color: theme.colors.highlightColor }}
            onPress={navigateToLogin}
          >
            Login
          </Text>
        </Typography>

        <View style={{ height: 10 }} />

        <Typography
          variant="body"
          style={{
            textAlign: "center",
          }}
        >
          By creating an account, you agree to our{" "}
          <Text style={{ color: theme.colors.highlightColor }}>Terms</Text> and{" "}
          <Text style={{ color: theme.colors.highlightColor }}>Privacy</Text>
        </Typography>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight as number) || 0,
    padding: 10,
  },
});
