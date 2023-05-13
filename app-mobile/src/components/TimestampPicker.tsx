import React from "react";
import { View, Pressable } from "react-native";
import Typography from "./Typography";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useTheme from "@src/hooks/useTheme";

type TimestampPickerProps = {
  placeholder: string;
  onChange: (date: Date) => void;
  value?: string;
};

const TimestampPicker = (Props: TimestampPickerProps) => {
  const { placeholder, onChange, value } = Props;

  const [isDateTimePickerVisible, setDateTimePickerVisibility] =
    React.useState(false);

  const { mode, theme } = useTheme();

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleDateConfirm = (date: Date) => {
    onChange(date);
    hideDateTimePicker();
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={showDateTimePicker}
        style={{
          backgroundColor: theme.colors.textInputBackgroundColor,
          padding: 10,
          borderRadius: 10,
          paddingVertical: 15,
        }}
      >
        <Typography variant="body" style={{ color: "grey" }}>
          {placeholder}
        </Typography>

        <View style={{ height: 5 }} />

        <Typography variant="body">
          {dayjs(value).format("DD/MM/YYYY hh:mm A")}
        </Typography>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDateTimePicker}
      />
    </View>
  );
};

export default TimestampPicker;
