import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Typography from "./Typography";
import useTheme from "@src/hooks/useTheme";

type IRadioProps = {
  qid: string;
  options: {
    id: string;
    value: string;
  }[];
  value: string[];
  onChange: Function;
};

const Radio = (props: IRadioProps) => {
  const { theme } = useTheme();

  const { qid, options, value, onChange } = props;

  return (
    <View>
      {options &&
        options.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.radioContainer,
              {
                marginTop: index === 0 ? 0 : 10,
              },
            ]}
            key={item.id}
            onPress={() => {
              if (value.includes(item.value)) {
                // setSelected((prev) => prev.filter((i) => i !== item.value));
                onChange(
                  qid,
                  value.filter((i) => i !== item.value)
                );
              } else {
                // setSelected((prev) => [item.value]);
                onChange(qid, [item.value]);
              }
            }}
          >
            <View
              style={[
                styles.radioButton,
                {
                  borderColor: theme.colors.radioButtonColor,
                },
              ]}
            >
              {value.includes(item.value) && (
                <View
                  style={[
                    styles.radioButtonActive,
                    {
                      backgroundColor: theme.colors.radioButtonColor,
                    },
                  ]}
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

export default Radio;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  radioButtonActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
