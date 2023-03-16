import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import Typography from "./Typography";

type PollListItemProps = {
  poll: {
    id: number;
    title: string;
    user: {
      id: number;
      name: string;
      userName: string;
    };
    createdAt: string;
  };
  isLast: boolean;
};

const PollListItem = (props: PollListItemProps) => {
  const { poll, isLast } = props;

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("rgba(0, 0, 0, 0.1)", false)}
    >
      <View
        style={[
          styles.container,
          {
            borderBottomWidth: isLast ? 0 : 1,
          },
        ]}
      >
        <Typography variant='h3' style={styles.title}>
          {poll.title}
        </Typography>

        <Typography variant='body' style={styles.username}>
          @{poll.user.userName}
        </Typography>

        <Typography variant='body' style={styles.date}>
          {dayjs(poll.createdAt).format("DD/MM/YYYY HH:mm")}
        </Typography>
      </View>
    </TouchableNativeFeedback>
  );
};

export default PollListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "lightgray",
    padding: 10,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
    marginBottom: 10,
  },

  username: {
    fontSize: 16,
    color: "blue",
    marginBottom: 10,
  },

  date: {
    fontSize: 14,
    color: "gray",
  },
});
