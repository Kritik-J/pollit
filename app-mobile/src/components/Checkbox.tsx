import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import Typography from "./Typography";
import { FontAwesome5 } from "@expo/vector-icons";

// const options = [
//   {
//     id: 0,
//     value: "First",
//   },
//   {
//     id: 1,
//     value: "Second",
//   },
//   {
//     id: 2,
//     value: "Third",
//   },
// ];

type ICheckboxProps = {
  qid: string;
  options: {
    id: string;
    value: string;
  }[];
  onChange: Function;
};

const Checkbox = (props: ICheckboxProps) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const { theme } = useTheme();

  const { qid, options, onChange } = props;

  React.useEffect(() => {
    onChange(qid, selected);
  }, [selected]);

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
            onPress={() => {
              if (selected.includes(item.value)) {
                setSelected((prev) => prev.filter((i) => i !== item.value));
              } else {
                setSelected((prev) => [...prev, item.value]);
              }
            }}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: theme.colors.checkboxColor,
                  backgroundColor: selected.includes(item.value)
                    ? theme.colors.checkboxColor
                    : "transparent",
                },
              ]}
            >
              {selected.includes(item.value) && (
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
