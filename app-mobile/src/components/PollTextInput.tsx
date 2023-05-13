import { TextInput } from "react-native";
import React from "react";
import useTheme from "../hooks/useTheme";

type PollTextInputProps = {
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: string;
  fontColor?: string;
  inputStyle?: any;
  keyboardType?: any;
  InputProps?: any;
  status?: "error" | "success" | "warning" | "info";
  qid: string;
  onChange: Function;
};

const PollTextInput = (props: PollTextInputProps) => {
  const { theme } = useTheme();

  const [answer, setAnswer] = React.useState("");

  const {
    borderRadius = 10,
    borderWidth = 1,
    borderColor = theme.colors.textInputBorderColor,
    backgroundColor = theme.colors.textInputBackgroundColor,
    fontSize = 14,
    fontWeight = "normal",
    fontColor = theme.colors.textInputFontColor,
    inputStyle,
    keyboardType = "default",
    InputProps,
    status,
    qid,
    onChange,
  } = props;

  React.useEffect(() => {
    onChange(qid, answer);
  }, [answer]);

  return (
    <TextInput
      style={{
        borderRadius,
        borderColor,
        alignItems: "center",
        flexDirection: "row",
        borderWidth: borderWidth,
        backgroundColor,
        padding: 10,
        fontSize,
        fontWeight,
        // color: status ? statusStyle(status) : fontColor,
        color: fontColor,
        ...inputStyle,
      }}
      value={answer}
      onChangeText={(text: string) => {
        setAnswer(text);
      }}
      keyboardType={keyboardType}
      {...InputProps}
    />
  );
};

export default PollTextInput;
