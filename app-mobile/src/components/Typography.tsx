import React from "react";
import { Text } from "react-native";

type TypographyProps = {
  variant: "h1" | "h2" | "h3" | "body";
  children: React.ReactNode;
  style?: any;
};

const Typography = ({ variant, children, style }: TypographyProps) => {
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
    case "body":
      textStyle = styles.body;
      break;
    default:
      textStyle = styles.body;
  }

  return <Text style={[textStyle, style]}>{children}</Text>;
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
  body: {
    fontSize: 16,
  },
};

export default Typography;
