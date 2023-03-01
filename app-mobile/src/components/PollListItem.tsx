import { StyleSheet, Text, View } from "react-native";
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
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: isLast ? 0 : 4,
        },
      ]}
    >
      <Text style={styles.title}>{poll.title}</Text>

      <Text>Created by: @{poll.user.userName}</Text>

      <Text>
        Created at:
        {dayjs(poll.createdAt).format("DD/MM/YYYY HH:mm")}
      </Text>
    </View>
  );
};

export default PollListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomColor: "lightgray",
    padding: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
