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
      inputStyles={styles.underlineStyleBase}
      inputContainerStyles={styles.underlineStyleHighLighted}
      secureTextEntry={true}
      style={styles.container}
    />
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  underlineStyleBase: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 14,
  },

  underlineStyleHighLighted: {
    borderColor: "#537FE7",
  },
});
