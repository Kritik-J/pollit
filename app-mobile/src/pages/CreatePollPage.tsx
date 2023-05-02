import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import FormInput from "@src/components/FormInput";
import Typography from "@src/components/Typography";
import Picker from "@src/components/Picker";
import { MinusIcon, PlusIcon } from "@src/components/Svg";
import { Pressable } from "react-native";

const answerTypes = [
  { value: "Text" },
  { value: "Radio" },
  { value: "Checkbox" },
];

type IForm = {
  questions: {
    id: string;
    question: string;
    answerType: string;
    options?: string[];
  }[];
};

const CreatePollPage = () => {
  const { theme } = useTheme();
  const [title, setTitle] = React.useState<string>("");
  const [form, setForm] = React.useState<IForm>({
    questions: [
      {
        id: "1",
        question: "",
        answerType: "",
      },
    ],
  });

  const handleAddQuestion = () => {
    setForm({
      questions: [
        ...form.questions,
        {
          id: `${form.questions.length + 1}`,
          question: "",
          answerType: "",
        },
      ],
    });
  };

  const handleRemoveQuestion = (id: string) => {
    if (form.questions.length === 1) return;

    const newQuestions = form.questions.filter((item) => item.id !== id);

    const updatedQuestions = newQuestions.map((item, index) => {
      return {
        ...item,
        id: `${index + 1}`,
      };
    });

    setForm({
      questions: updatedQuestions,
    });
  };

  const handleUpdateAnswerType = (qid: string, value: string) => {
    const newQuestions = form.questions.map((item) => {
      if (item.id === qid) {
        return {
          ...item,
          answerType: value,
        };
      }

      return item;
    });

    setForm({
      questions: newQuestions,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <Typography variant="h2">Create a new poll</Typography>

      <View style={{ height: 30 }} />

      <FormInput
        placeholder="Poll title"
        value={title}
        onChangeText={setTitle}
      />

      <View style={{ height: 30 }} />

      {form.questions.map((item, index) => (
        <View
          style={{ flexDirection: "row", marginTop: index === 0 ? 0 : 20 }}
          key={index}
        >
          {index === form.questions.length - 1 ? (
            <Pressable style={styles.plusIcon} onPress={handleAddQuestion}>
              <PlusIcon fill="#ffffff" />
            </Pressable>
          ) : (
            <Pressable
              style={styles.minusIcon}
              onPress={() => handleRemoveQuestion(item.id)}
            >
              <MinusIcon fill="#ffffff" />
            </Pressable>
          )}

          <View style={{ flex: 1 }}>
            <FormInput
              placeholder={`Question ${item.id}`}
              value=""
              onChangeText={() => {}}
            />

            <View style={{ height: 10 }} />

            <Picker
              qid={item.id}
              options={answerTypes}
              onChange={handleUpdateAnswerType}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CreatePollPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },

  plusIcon: {
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#537FE7",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  minusIcon: {
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
