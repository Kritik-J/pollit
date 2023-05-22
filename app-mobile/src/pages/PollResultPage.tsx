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
import Button from "@src/components/Button";
import { apiURL } from "@src/utils/constants/api";
import axios from "axios";
import useAuth from "@src/hooks/useAuth";
import dayjs from "dayjs";
import useForm from "@src/hooks/useForm";
import { setVoteForm } from "@src/redux/formSlice";
import { useAppDispatch } from "@src/hooks/useReduce";
import { IPoll } from "interfaces";
import { FlatList } from "react-native-gesture-handler";

const PollResultPage = () => {
  const { theme } = useTheme();
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [poll, setPoll] = useState<any>();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { voteForm } = useForm();

  const alreadyAnswered =
    user && poll && poll.voters && poll.voters.includes(user?._id);

  const routes = useRoute() as any;

  const pollId = routes?.params?.pollId;

  const fetchPollResult = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiURL}/polls/${pollId}/result`);
      setPoll(data.poll);
      setLoading(false);
    } catch (err) {
      alert("Error fetching results");
      setLoading(false);
    }
  };

  function navigateBack() {
    nav.goBack();
  }

  useEffect(() => {
    fetchPollResult();
  }, []);

  // if (!loading && !poll) {
  //   navigateBack();
  // }

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

      <View style={styles.bodyContainer}>
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

                <View style={{ height: 30 }} />

                {console.log(poll)}
                <View>
                  <Typography variant="h3">
                    {poll.questions[0].question}
                  </Typography>
                  <FlatList
                    data={poll.questions[0].votes}
                    renderItem={({ item, index }) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                          marginRight: 10,
                        }}
                      >
                        <Typography variant="body">
                          {item.voterId.userName}
                        </Typography>
                        <Typography variant="body">
                          {poll.questions[0].answerType === "text"
                            ? item.textAnswer
                            : item.optionAnswer.join(", ").toString()}
                        </Typography>
                      </View>
                    )}
                  />
                </View>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default PollResultPage;

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
