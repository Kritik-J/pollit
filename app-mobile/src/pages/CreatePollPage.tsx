import { StyleSheet, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import FormInput from "@src/components/FormInput";
import Typography from "@src/components/Typography";

const CreatePollPage = () => {
  const { theme } = useTheme();
  const [title, setTitle] = React.useState<string>("");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <Typography variant="h2">Create a new poll</Typography>

      <View style={{ height: 20 }} />

      <FormInput
        placeholder="Poll title"
        value={title}
        onChangeText={setTitle}
      />
    </View>
  );
};

export default CreatePollPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
