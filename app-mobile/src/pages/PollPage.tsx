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
import { API_URL } from "@src/utils/constants/api";
import axios from "axios";
import useAuth from "@src/hooks/useAuth";

type IAnswer = {
  id: string;
  value: string | string[];
};

const PollPage = () => {
  const { theme } = useTheme();
  const nav = useNavigation();
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [poll, setPoll] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const alreadyAnswered = poll.voters && poll.voters.includes(user?._id);

  const routes = useRoute() as any;

  const pollId = routes?.params?.pollId;

  const fetchPoll = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/polls/${pollId}`);
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
    const newAnswers = [...answers];

    const index = newAnswers.findIndex((item) => item.id === id);
    if (index === -1) {
      newAnswers.push({ id, value });
    } else {
      newAnswers[index] = { id, value };
    }

    setAnswers(newAnswers);
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  const handleSubmitAnswers = async () => {
    try {
      setSubmitting(true);

      const { data } = await axios.post(`${API_URL}/polls/${pollId}/vote`, {
        votes: answers,
      });

      alert("Poll answered successfully");
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
          {
            backgroundColor: theme.colors.headerBackgroundColor,
          },
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
            <Typography variant="h2">{poll.title}</Typography>

            <View style={{ height: 30 }} />

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
                      onChange={updateAnswers}
                    />
                  )}

                  {item.answerType === "checkbox" && item.options && (
                    <Checkbox
                      qid={item._id}
                      options={item.options}
                      onChange={updateAnswers}
                    />
                  )}

                  {item.answerType === "text" && (
                    <PollTextInput qid={item._id} onChange={updateAnswers} />
                  )}
                </View>
              ))}

            <View style={{ height: 30 }} />

            <Button
              title={alreadyAnswered ? "Already Answered" : "Submit Answers"}
              onPress={handleSubmitAnswers}
              loading={submitting}
              disabled={submitting || alreadyAnswered}
            />
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

  questionsList: {},
});
