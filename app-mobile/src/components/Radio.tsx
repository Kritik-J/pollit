import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Typography from "./Typography";
import useTheme from "@src/hooks/useTheme";

const options = [
  {
    id: 0,
    value: "First",
  },
  {
    id: 1,
    value: "Second",
  },
  {
    id: 2,
    value: "Third",
  },
];

const Radio = () => {
  const [selected, setSelected] = React.useState("");
  const { theme } = useTheme();

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
            onPress={() => setSelected(item.value)}
          >
            <View
              style={[
                styles.radioButton,
                {
                  borderColor: theme.colors.radioButtonColor,
                },
              ]}
            >
              {selected === item.value && (
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
