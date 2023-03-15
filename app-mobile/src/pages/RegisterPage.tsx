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

const RegisterPage = () => {
  const [email, setEmail] = React.useState<string>("");

  const { theme } = useTheme();

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
          Create an account to get started
        </Typography>

        <View style={{ height: 30 }} />

        <FormInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
        />

        <View style={{ height: 20 }} />

        <Button
          title='Get OTP'
          onPress={() => {
            console.log("Email: ", email);
          }}
        />
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
