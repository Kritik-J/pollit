import { TextInput, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

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
  status?: "error" | "success" | "warning" | "info";
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
    onKeyPress,
    secureTextEntry = false,
    keyboardType = "default",
    InputProps,
    status,
  } = Props;

  const { theme } = useSelector((state: any) => state.ui);

  const statusStyle = (status: "error" | "success" | "warning" | "info") => {
    switch (status) {
      case "error":
        return theme.errorColor;
      case "success":
        return theme.successColor;
      case "warning":
        return theme.warningColor;
      case "info":
        return theme.infoColor;
      default:
        return "black";
    }
  };

  return (
    <View
      style={{
        borderRadius,
        alignItems: "center",
        flexDirection: "row",
        borderWidth: status ? 2 : borderWidth,
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
