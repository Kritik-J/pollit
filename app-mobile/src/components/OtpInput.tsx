import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import useTheme from "@src/hooks/useTheme";

type OtpInputProps = {
  numInputs: number;
  onChange: (otp: string) => void;
};

const OtpInput = (props: OtpInputProps) => {
  const { numInputs, onChange } = props;

  const [otp, setOtp] = useState(Array(numInputs).fill(""));

  const inputRef = useRef<Array<TextInput | null>>(Array(numInputs).fill(null));

  const { theme } = useTheme();

  const handleChange = (index: number, value: string) => {
    if (isNaN(+value)) {
      return;
    }

    setOtp((prevOtp) => {
      const otp = [...prevOtp];
      otp[index] = value;

      return otp;
    });

    if (value !== "") {
      if (index !== numInputs - 1) {
        inputRef.current[index + 1]?.focus();
      }
    } else {
      if (index !== 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  function handleFocus(index: number) {
    for (let i = index - 1; i >= 0; i--) {
      if (otp[i] === "") {
        inputRef.current[i]?.focus();
        return;
      }
    }
  }

  function handleBackspace(index: number) {
    if (otp[index] === "") {
      if (index !== 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  }

  React.useEffect(() => {
    onChange(otp.join(""));
  }, [otp]);

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRef.current[index] = ref)}
          style={[
            styles.input,
            {
              borderColor: theme.colors.otpInputBorderInactiveColor,
              color: theme.colors.otpInputFontColor,
            },
            otp[index] !== "" && {
              borderColor: theme.colors.otpInputBorderActiveColor,
            },
          ]}
          value={value}
          onChangeText={(text) => handleChange(index, text)}
          maxLength={1}
          keyboardType='numeric'
          onFocus={() => handleFocus(index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspace(index);
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    width: 48,
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
});

export default OtpInput;
