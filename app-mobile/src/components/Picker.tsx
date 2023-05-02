import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import Typography from "./Typography";
import { DownIcon } from "./Svg";
import useForm from "@src/hooks/useForm";
import { setPollForm } from "@src/redux/formSlice";
import { useAppDispatch } from "@src/hooks/useReduce";

type IPickerProps = {
  qid?: string;
  options: {
    // id: string;
    value: string;
  }[];
};

const Picker = (props: IPickerProps) => {
  const { options, qid } = props;
  const { theme } = useTheme();
  const { pollForm } = useForm();
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const { questions } = pollForm;

  const selectedOption = questions.find((item) => item.id === qid)?.answerType;

  const handleSelectOption = (value: string) => {
    setShowOptions(false);
    dispatch(
      setPollForm({
        ...pollForm,
        questions: questions.map((item) =>
          // if value is checkbox or radio, then set 1 option by default

          item.id === qid
            ? {
                ...item,
                answerType: value,
                options:
                  value === "Checkbox" || value === "Radio"
                    ? [
                        {
                          id: "1",
                          value: "",
                        },
                      ]
                    : undefined,
              }
            : item
        ),
      })
    );
  };

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
              onPress={() => handleSelectOption(item.value)}
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
