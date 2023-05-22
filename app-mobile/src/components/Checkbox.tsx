import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import Typography from "./Typography";
import { FontAwesome5 } from "@expo/vector-icons";

type ICheckboxProps = {
  qid?: string;
  options: {
    id: string;
    value: string;
  }[];
  value: string[];
  disabled?: boolean;
  onChange: Function;
};

const Checkbox = (props: ICheckboxProps) => {
  const { theme } = useTheme();

  const { qid, options, value, onChange, disabled } = props;

  return (
    <View>
      {options &&
        options.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.checkboxContainer,
              {
                marginTop: index === 0 ? 0 : 10,
              },
            ]}
            key={item.id}
            disabled={disabled}
            onPress={() => {
              if (qid) {
                if (value.includes(item.value)) {
                  onChange(
                    qid,
                    value.filter((i) => i !== item.value)
                  );
                } else {
                  onChange(qid, [...value, item.value]);
                }
              } else {
                if (value.includes(item.value)) {
                  onChange(value.filter((i) => i !== item.value));
                } else {
                  onChange([...value, item.value]);
                }
              }
            }}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: theme.colors.checkboxColor,
                  backgroundColor: value.includes(item.value)
                    ? theme.colors.checkboxColor
                    : "transparent",
                },
              ]}
            >
              {value.includes(item.value) && (
                <FontAwesome5
                  name="check"
                  size={10}
                  color={theme.colors.checkboxTickColor}
                />
              )}
            </View>

            <Typography variant="h4" style={{ marginLeft: 10 }}>
              {item.value}
            </Typography>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
