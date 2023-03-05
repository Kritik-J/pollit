import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import dayjs from "dayjs";

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
        <Text style={styles.title}>{poll.title}</Text>

        <Text style={styles.username}>@{poll.user.userName}</Text>

        <Text style={styles.date}>
          {dayjs(poll.createdAt).format("DD/MM/YYYY HH:mm")}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default PollListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "lightgray",
    padding: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
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
