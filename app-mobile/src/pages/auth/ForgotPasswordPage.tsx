import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import Typography from "@src/components/Typography";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FormInput from "@src/components/FormInput";
import Button from "@src/components/Button";
import { checkNull } from "@src/utils/validators";

const ForgotPasswordPage = () => {
  const { theme } = useTheme();
  const nav = useNavigation() as any;

  const [formInput, setFormInput] = React.useState({
    userNameOrEmail: "",
    otp: "",
  });

  const [errors, setErrors] = React.useState({
    userNameOrEmail: "",
    otp: "",
  });

  const handleFormInput = (key: string, value: string) => {
    setFormInput({
      ...formInput,
      [key]: value,
    });

    setErrors({ ...errors, [key]: "" });
  };

  function navigateBack() {
    nav.goBack();
  }

  const handleGetOtp = () => {
    const { userNameOrEmail } = formInput;

    if (checkNull(userNameOrEmail)) {
      setErrors({
        ...errors,
        userNameOrEmail: "Username or Email is required",
      });
      return;
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundColor,
      }}
    >
      <AntDesign
        name="arrowleft"
        size={24}
        color={theme.colors.fontColor}
        onPress={navigateBack}
      />

      <View style={{ height: 20 }} />

      <Typography variant="h1">Forgot Password</Typography>

      <View style={{ height: 5 }} />

      <Typography variant="h3" style={{ color: "grey" }}>
        Enter your email address below and we'll send you a otp to reset your
        password.
      </Typography>

      <View style={{ height: 30 }} />

      <FormInput
        placeholder="Username or Email"
        value={formInput.userNameOrEmail}
        keyboardType="email-address"
        InputProps={{
          autoCapitalize: "none",
        }}
        onChangeText={(text) => handleFormInput("userNameOrEmail", text)}
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

      <Button title="Get OTP" onPress={handleGetOtp} />

      <View style={{ height: 25 }} />

      <FormInput
        placeholder="OTP"
        value={formInput.otp}
        onChangeText={(text) => handleFormInput("otp", text)}
        status={errors.otp !== "" ? "error" : ""}
      />
      {errors.otp !== "" && (
        <Typography
          variant="body"
          style={{ color: theme.colors.errorColor, marginTop: 10 }}
        >
          {errors.otp}
        </Typography>
      )}

      <View style={{ height: 20 }} />

      <Button title="Verify Otp" onPress={() => {}} />
    </View>
  );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight as number) + 10 || 0,
    padding: 10,
  },
});
