import { StyleSheet } from "react-native";
import React from "react";
import OtpInputs from "react-native-otp-inputs";

type OtpInputProps = {
  handleChange: (code: string) => void;
};

const OtpInput = (props: OtpInputProps) => {
  const { handleChange } = props;

  return (
    <OtpInputs
      handleChange={handleChange}
      autofillFromClipboard={false}
      numberOfInputs={6}
      secureTextEntry={true}
      style={styles.otpContainer}
      inputContainerStyles={styles.inputContainer}
      inputStyles={styles.input}
      focusStyles={styles.inputContainerFocused}
    />
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  otpContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    textAlign: "center",
    fontSize: 14,
  },

  inputContainerFocused: {
    borderColor: "#537FE7",
    borderRadius: 5,
  },
});
