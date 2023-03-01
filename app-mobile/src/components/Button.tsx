import { ActivityIndicator, Pressable, Text } from "react-native";
import React from "react";

type ButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  loading?: boolean;
  disabled?: boolean;
  fontSize?: number;
  fontWeight?: string;
  fontColor?: string;
  spinnerColor?: string;
  buttonStyle?: any;
  textStyle?: any;
};

const Button = (props: ButtonProps) => {
  const {
    title,
    onPress,
    backgroundColor = "#000",
    borderRadius = 5,
    borderWidth = 1,
    borderColor = backgroundColor,
    loading = false,
    disabled = false,
    fontSize = 16,
    fontColor = "#fff",
    spinnerColor = "#fff",
    buttonStyle,
    textStyle,
  } = props;

  return (
    <Pressable
      style={{
        backgroundColor,
        borderRadius,
        borderWidth,
        borderColor,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        opacity: disabled ? 0.85 : 1,
        ...buttonStyle,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size='small' color={spinnerColor} />
      ) : (
        <Text
          style={{
            color: fontColor,
            fontSize,
            ...textStyle,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
