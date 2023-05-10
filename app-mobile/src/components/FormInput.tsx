import { TextInput, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";

type FormInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onKeyPress?: (event: any) => void;
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
  status?: "error" | "success" | "warning" | "info" | "";
};

const FormInput = (Props: FormInputProps) => {
  const { theme } = useTheme();

  const {
    placeholder,
    leadingIcon,
    trailingIcon,
    borderRadius = 10,
    borderWidth = 1.5,
    borderColor = theme.colors.textInputBorderColor,
    backgroundColor = theme.colors.textInputBackgroundColor,
    placeholderTextColor = "grey",
    fontSize = 14,
    fontWeight = "normal",
    fontColor = theme.colors.textInputFontColor,
    containerStyle,
    inputStyle,
    value,
    onChangeText,
    onKeyPress,
    secureTextEntry = false,
    keyboardType = "default",
    InputProps,
    status,
  } = Props;

  const statusStyle = (
    status: "error" | "success" | "warning" | "info" | ""
  ) => {
    switch (status) {
      case "error":
        return theme.colors.errorColor;
      case "success":
        return theme.colors.successColor;
      case "warning":
        return theme.colors.warningColor;
      case "info":
        return theme.colors.infoColor;
      default:
        return theme.colors.textInputBorderColor;
    }
  };

  return (
    <View
      style={{
        borderRadius,
        alignItems: "center",
        flexDirection: "row",
        borderWidth: borderWidth,
        borderColor: status ? statusStyle(status) : borderColor,
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
          // color: status ? statusStyle(status) : fontColor,
          color: fontColor,
          ...inputStyle,
        }}
        value={value}
        onChangeText={(text: string) => {
          onChangeText && onChangeText(text);
        }}
        onKeyPress={onKeyPress}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        {...InputProps}
      />

      {trailingIcon && trailingIcon}
    </View>
  );
};

export default FormInput;
