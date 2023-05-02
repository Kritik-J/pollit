import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import Typography from "./Typography";
import { DownIcon } from "./Svg";

type IPickerProps = {
  defaultValue?: string;

  options: {
    // id: string;
    value: string;
  }[];

  onChange: Function;
};

const Picker = (props: IPickerProps) => {
  const { defaultValue, options, onChange } = props;
  const { theme } = useTheme();
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState<string>(
    defaultValue || ""
  );

  React.useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);

  return (
    <View
      style={[
        styles.container,
        { borderColor: theme.colors.textInputBorderColor },
      ]}
    >
      <Pressable
        style={[styles.pickerContainer]}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Typography
          variant="body"
          style={{
            color: selectedOption ? theme.colors.fontColor : "grey",
          }}
        >
          {selectedOption ? selectedOption : "Select an answer type"}
        </Typography>

        <DownIcon width={16} height={16} fill="grey" />
      </Pressable>

      {showOptions && (
        <View style={[styles.optionsContainer]}>
          {options.map((item, index) => (
            <Pressable
              style={[styles.option]}
              key={index}
              onPress={() => {
                setSelectedOption(item.value);
                setShowOptions(false);
              }}
            >
              <Typography variant="body">{item.value}</Typography>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
  },

  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  optionsContainer: {},

  option: {
    padding: 10,
  },
});
