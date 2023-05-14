import useTheme from "@src/hooks/useTheme";
import React from "react";
import { Text, TextProps } from "react-native";

interface TypographyProps extends TextProps {
  variant: "h1" | "h2" | "h3" | "h4" | "body";
  children: React.ReactNode;
  style?: any;
  textProps?: TextProps;
}

const Typography = ({
  variant,
  children,
  style,
  textProps,
}: TypographyProps) => {
  const { theme } = useTheme();

  let textStyle = {};

  switch (variant) {
    case "h1":
      textStyle = styles.h1;
      break;
    case "h2":
      textStyle = styles.h2;
      break;
    case "h3":
      textStyle = styles.h3;
      break;
    case "h4":
      textStyle = styles.h4;
      break;
    case "body":
      textStyle = styles.body;
      break;
    default:
      textStyle = styles.body;
  }

  return (
    <Text
      style={[textStyle, { color: theme.colors.fontColor }, style]}
      {...textProps}
    >
      {children}
    </Text>
  );
};

const styles = {
  h1: {
    fontSize: 32,
    fontWeight: "600",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
  },
  h3: {
    fontSize: 18,
    fontWeight: "600",
  },
  h4: {
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
  },
};

export default Typography;
