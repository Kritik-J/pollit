// TODO: Add types

import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import useTheme from "@src/hooks/useTheme";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Typography from "@src/components/Typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import Radio from "@src/components/Radio";
import Checkbox from "@src/components/Checkbox";
import PollTextInput from "@src/components/PollTextInput";
import Button from "@src/components/Button";
import { apiURL } from "@src/utils/constants/api";
import axios from "axios";
import useAuth from "@src/hooks/useAuth";
import dayjs from "dayjs";
import useForm from "@src/hooks/useForm";
import { setVoteForm } from "@src/redux/formSlice";
import { useAppDispatch } from "@src/hooks/useReduce";
import { IPoll } from "interfaces";

const PollPage = () => {
  const { theme } = useTheme();
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [poll, setPoll] = useState<IPoll | null>();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { voteForm } = useForm();

  const alreadyAnswered =
    user && poll && poll.voters && poll.voters.includes(user?._id);

  const routes = useRoute() as any;

  const pollId = routes?.params?.pollId;

  const fetchPoll = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiURL}/polls/${pollId}`);
      setPoll(data.poll);
      setLoading(false);
    } catch (err) {
      alert("Error fetching poll");
      setLoading(false);
    }
  };

  function navigateBack() {
    nav.goBack();
  }

  const updateAnswers = (id: string, value: string | string[]) => {
    const newAnswers = [...voteForm];

    const index = newAnswers.findIndex((item) => item.id === id);
    if (index === -1) {
      newAnswers.push({ id, value });
    } else {
      newAnswers[index] = { id, value };
    }

    dispatch(setVoteForm(newAnswers));
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  const handleSubmitAnswers = async () => {
    try {
      setSubmitting(true);

      const { data } = await axios.post(`${apiURL}/polls/${pollId}/vote`, {
        votes: voteForm,
      });

      alert("Poll answered successfully");
      setPoll(data.poll);
      dispatch(setVoteForm([]));
      setSubmitting(false);
    } catch (err: any) {
      alert(err.response.data.message);
      setSubmitting(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: theme.colors.headerBackgroundColor },
        ]}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={navigateBack}
        />

        <Entypo name="dots-three-vertical" size={20} color="white" />
      </View>

      <ScrollView contentContainerStyle={styles.bodyContainer}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#537FE7" />
          </View>
        ) : (
          <>
            {poll && (
              <>
                <Typography variant="h2">{poll.title}</Typography>

                <View style={{ height: 30 }} />

                <View style={styles.pollDetails}>
                  <Typography variant="body">
                    Started On{" "}
                    {dayjs(poll.createdAt).format("DD MMM YYYY hh:mm A")}
                  </Typography>

                  <View style={{ height: 5 }} />

                  <Typography variant="body">
                    Ends On {dayjs(poll.endAt).format("DD MMM YYYY hh:mm A")}
                  </Typography>

                  <View style={{ height: 5 }} />

                  <Typography variant="body">
                    {poll.voters?.length}{" "}
                    {poll.voters?.length === 1 ? "person" : "people"} answered
                    {/* &bull;  */}
                  </Typography>
                </View>

                <View style={{ height: 20 }} />

                {poll.questions &&
                  poll.questions.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        marginTop: index === 0 ? 0 : 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h3" style={{ flex: 1 }}>
                          {index + 1}. {item.question}
                        </Typography>
                      </View>

                      <View style={{ height: 15 }} />

                      {item.answerType === "radio" && item.options && (
                        <Radio
                          qid={item._id}
                          options={item.options}
                          value={
                            (voteForm.find((q) => q.id === item._id)?.value ||
                              []) as string[]
                          }
                          onChange={updateAnswers}
                        />
                      )}

                      {item.answerType === "checkbox" && item.options && (
                        <Checkbox
                          qid={item._id}
                          options={item.options}
                          value={
                            (voteForm.find((q) => q.id === item._id)?.value ||
                              []) as string[]
                          }
                          onChange={updateAnswers}
                        />
                      )}

                      {item.answerType === "text" && (
                        <PollTextInput
                          qid={item._id}
                          value={
                            (voteForm.find((q) => q.id === item._id)?.value ||
                              "") as string
                          }
                          onChange={updateAnswers}
                        />
                      )}
                    </View>
                  ))}

                <View style={{ height: 30 }} />

                <Button
                  title={
                    alreadyAnswered ? "Already Answered" : "Submit Answers"
                  }
                  onPress={handleSubmitAnswers}
                  loading={submitting}
                  disabled={submitting || alreadyAnswered ? true : false}
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default PollPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    padding: 10,
    paddingTop: (StatusBar.currentHeight as number) + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bodyContainer: {
    flexGrow: 1,
    padding: 10,
  },

  pollDetails: {},
});
