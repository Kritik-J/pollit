import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import FormInput from "@src/components/FormInput";
import Typography from "@src/components/Typography";
import Picker from "@src/components/Picker";
import { MinusIcon, PlusIcon } from "@src/components/Svg";
import { Pressable } from "react-native";
import useForm from "@src/hooks/useForm";
import { setPollForm } from "@src/redux/formSlice";
import { useAppDispatch } from "@src/hooks/useReduce";
import Button from "@src/components/Button";
import axios from "axios";
import { apiURL } from "@src/utils/constants/api";
import dayjs from "dayjs";
import TimestampPicker from "@src/components/TimestampPicker";

const answerTypes = [
  { value: "text" },
  { value: "radio" },
  { value: "checkbox" },
];

const CreatePollPage = () => {
  const { theme } = useTheme();
  const { pollForm } = useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(
      setPollForm({
        ...pollForm,
        startAt: new Date().toUTCString(),
        endAt: new Date(
          new Date().getTime() + 2 * 24 * 60 * 60 * 1000
        ).toUTCString(),
      })
    );
  }, []);

  // Add new question

  const handleAddQuestion = () => {
    dispatch(
      setPollForm({
        ...pollForm,
        questions: [
          ...pollForm.questions,
          {
            id: pollForm.questions.length + 1,
            question: "",
            answerType: "",
            required: false,
          },
        ],
      })
    );
  };

  // Remove question

  const handleRemoveQuestion = (qid: string) => {
    const updatedQuestions = pollForm.questions.filter(
      (item) => item.id !== qid
    );

    const updatedQuestionsWithId = updatedQuestions.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

    dispatch(
      setPollForm({
        ...pollForm,
        questions: updatedQuestionsWithId,
      })
    );
  };

  // Add new option

  const handleAddOption = (qid: string) => {
    const updatedQuestions = pollForm.questions.map((item) => {
      if (item.id === qid) {
        return {
          ...item,
          options: [
            ...(item.options || []),
            {
              id: (item.options && item.options.length + 1) || 1,
              value: "",
            },
          ],
        };
      }

      return item;
    });

    dispatch(
      setPollForm({
        ...pollForm,
        questions: updatedQuestions,
      })
    );
  };

  // Remove option

  const handleRemoveOption = (qid: string, oid: string) => {
    const updatedQuestions = pollForm.questions.map((item) => {
      if (item.id === qid) {
        return {
          ...item,
          options: item.options?.filter((option) => option.id !== oid),
        };
      }

      return item;
    });

    const updatedQuestionsWithId = updatedQuestions.map((item) => ({
      ...item,
      options: item.options?.map((option, index) => ({
        ...option,
        id: index + 1,
      })),
    }));

    dispatch(
      setPollForm({
        ...pollForm,
        questions: updatedQuestionsWithId,
      })
    );
  };

  // Question value change

  const handleAddQuestionValue = (qid: string, value: string) => {
    const updatedQuestions = pollForm.questions.map((item) => {
      if (item.id === qid) {
        return {
          ...item,
          question: value,
        };
      }

      return item;
    });

    dispatch(
      setPollForm({
        ...pollForm,
        questions: updatedQuestions,
      })
    );
  };

  // Answer type change

  const handleAddOptionValue = (qid: string, oid: String, value: string) => {
    const updatedQuestions = pollForm.questions.map((item) => {
      if (item.id === qid) {
        return {
          ...item,
          options: item.options?.map((option) => {
            if (option.id === oid) {
              return {
                ...option,
                value,
              };
            }

            return option;
          }),
        };
      }

      return item;
    });

    dispatch(
      setPollForm({
        ...pollForm,
        questions: updatedQuestions,
      })
    );
  };

  const submitPoll = async () => {
    try {
      setLoading(true);

      if (!pollForm.title) {
        throw new Error("Please enter poll title");
      }

      if (pollForm.questions.length === 0) {
        throw new Error("Please add at least one question");
      }

      if (pollForm.questions.some((q) => !q.question)) {
        throw new Error("Please fill all questions");
      }

      if (pollForm.questions.some((q) => !q.answerType)) {
        throw new Error("Please select answer type");
      }

      if (
        pollForm.questions.some(
          (q) =>
            (q.answerType === "radio" || q.answerType === "checkbox") &&
            q.options?.some((o) => !o.value)
        )
      ) {
        throw new Error("Please fill all options");
      }

      if (!pollForm.startAt) {
        throw new Error("Please select start date");
      }

      if (!pollForm.endAt) {
        throw new Error("Please select end date");
      }

      if (dayjs(pollForm.startAt).isAfter(dayjs(pollForm.endAt))) {
        throw new Error("Start date cannot be after end date");
      }

      const { data } = await axios.post(`${apiURL}/polls`, pollForm);

      if (data) {
        alert("Poll created successfully");
      }

      dispatch(
        setPollForm({
          title: "",
          questions: [{ id: 1, question: "", answerType: "" }],
          startAt: new Date().toUTCString(),
          endAt: new Date(
            new Date().getTime() + 2 * 24 * 60 * 60 * 1000
          ).toUTCString(),
        })
      );

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(error.message);
    }
  };

  const iconStyle = {
    fill: "#ffffff",
    width: 16,
    height: 16,
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
        value={pollForm.title}
        onChangeText={(value) => {
          dispatch(setPollForm({ ...pollForm, title: value }));
        }}
      />

      <View style={{ height: 20 }} />

      {pollForm.questions.map((q, index) => (
        <View
          style={{ flexDirection: "row", marginTop: index === 0 ? 0 : 20 }}
          key={index}
        >
          {index === pollForm.questions.length - 1 ? (
            <Pressable style={styles.plusIcon} onPress={handleAddQuestion}>
              <PlusIcon {...iconStyle} />
            </Pressable>
          ) : (
            <Pressable
              style={styles.minusIcon}
              onPress={() => handleRemoveQuestion(q.id)}
            >
              <MinusIcon {...iconStyle} />
            </Pressable>
          )}

          <View style={{ flex: 1 }}>
            <FormInput
              placeholder={`Question ${q.id}`}
              value={q.question}
              onChangeText={(value) => handleAddQuestionValue(q.id, value)}
            />

            <View style={{ height: 10 }} />

            <Picker qid={q.id} options={answerTypes} />

            {q.answerType === "radio" ||
            (q.answerType === "checkbox" && q.options) ? (
              <>
                <View style={{ height: 10 }} />

                {q.options?.map((opt, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: index === 0 ? 0 : 10,
                    }}
                    key={index}
                  >
                    {index === (q.options && q.options?.length - 1) ? (
                      <Pressable
                        style={styles.plusIcon}
                        onPress={() => handleAddOption(q.id)}
                      >
                        <PlusIcon {...iconStyle} />
                      </Pressable>
                    ) : (
                      <Pressable
                        style={styles.minusIcon}
                        onPress={() => handleRemoveOption(q.id, opt.id)}
                      >
                        <MinusIcon {...iconStyle} />
                      </Pressable>
                    )}

                    <View style={{ flex: 1 }}>
                      <FormInput
                        placeholder={`Option ${opt.id}`}
                        value={opt.value}
                        onChangeText={(value) => {
                          handleAddOptionValue(q.id, opt.id, value);
                        }}
                        inputStyle={{ paddingVertical: 6 }}
                      />
                    </View>
                  </View>
                ))}
              </>
            ) : null}
          </View>
        </View>
      ))}

      <View style={{ height: 20 }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TimestampPicker
          placeholder="Start At:"
          onChange={(value) => {
            dispatch(setPollForm({ ...pollForm, startAt: value }));
          }}
          value={pollForm.startAt}
        />

        <Typography variant="h4" style={{ marginHorizontal: 10 }}>
          to
        </Typography>

        <TimestampPicker
          placeholder="End At:"
          onChange={(value) => {
            dispatch(setPollForm({ ...pollForm, endAt: value }));
          }}
          value={pollForm.endAt}
        />
      </View>

      <View style={{ height: 30 }} />

      <Button title="Create poll" onPress={submitPoll} loading={loading} />
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
    backgroundColor: "#537FE7",
    // borderColor: "#537FE7",
    // borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  minusIcon: {
    marginRight: 10,
    backgroundColor: "#FF0000",
    // borderColor: "#FF0000",
    // borderWidth: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
