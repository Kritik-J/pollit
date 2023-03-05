import { TextInput, View } from "react-native";
import React from "react";

type FormInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  placeholderTextColor?: string;
  fontSize?: number;
  fontWeight?: string;
  fontColor?: string;
  containerStyle?: any;
  inputStyle?: any;
  leadingIcon?: any;
  trailingIcon?: any;
  secureTextEntry?: boolean;
  keyboardType?: any;
  InputProps?: any;
};

const FormInput = (Props: FormInputProps) => {
  const {
    placeholder,
    leadingIcon,
    trailingIcon,
    borderRadius = 5,
    borderWidth = 1,
    borderColor = "black",
    backgroundColor = "white",
    placeholderTextColor = "grey",
    fontSize = 14,
    fontWeight = "normal",
    fontColor = "black",
    containerStyle,
    inputStyle,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = "default",
    InputProps,
  } = Props;

  return (
    <View
      style={{
        borderRadius,
        alignItems: "center",
        flexDirection: "row",
        borderWidth,
        borderColor,
        backgroundColor,
        ...containerStyle,
      }}
    >
      {leadingIcon && leadingIcon}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={{
          padding: 10,
          flex: 1,
          fontSize,
          fontWeight,
          color: fontColor,
          ...inputStyle,
        }}
        value={value}
        onChangeText={(text: string) => {
          onChangeText && onChangeText(text);
        }}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        {...InputProps}
      />

      {trailingIcon && trailingIcon}
    </View>
  );
};

export default FormInput;
