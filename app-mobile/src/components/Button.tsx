import { ActivityIndicator, Pressable, Text } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  height?: number | string;
  width?: string | number;
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
  const { theme } = useTheme();

  const {
    title,
    onPress,
    height = 48,
    width = "100%",
    backgroundColor = theme.colors.primaryButtonColor,
    borderRadius = 5,
    borderWidth = 1,
    borderColor = theme.colors.primaryButtonColor,
    loading = false,
    disabled = false,
    fontSize = 16,
    fontColor = theme.colors.primaryButtonTextColor,
    spinnerColor = theme.colors.primaryButtonTextColor,
    buttonStyle,
    textStyle,
  } = props;

  return (
    <Pressable
      style={{
        height,
        width,
        backgroundColor,
        borderRadius,
        borderWidth,
        borderColor,
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
