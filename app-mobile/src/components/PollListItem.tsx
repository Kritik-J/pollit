import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import Typography from "./Typography";
import { Entypo } from "@expo/vector-icons";
import useTheme from "@src/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

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

  isLastItem: boolean;
};

const PollListItem = (props: PollListItemProps) => {
  const { poll, isLastItem } = props;
  const { theme } = useTheme();
  const nav = useNavigation();

  function navigateToPoll() {
    nav.navigate("Poll" as never);
  }

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        theme.colors.rippleColor,
        false
      )}
      onPress={navigateToPoll}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.pollListItemColor,
            borderBottomWidth: isLastItem ? 0 : 1,
            borderBottomColor: theme.colors.pollListItemBorderBottomColor,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Typography variant="h3" style={styles.title}>
            {poll.title}
          </Typography>

          <Typography
            variant="body"
            style={[
              styles.username,
              {
                color: theme.colors.highlightColor,
              },
            ]}
          >
            @{poll.user.userName}
          </Typography>

          <Typography variant="body" style={styles.date}>
            {dayjs(poll.createdAt).format("DD/MM/YYYY HH:mm")}
          </Typography>
        </View>

        <Entypo
          name="dots-three-vertical"
          size={16}
          color={theme.colors.textInputIconColor}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default PollListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  username: {
    fontSize: 16,
    marginBottom: 10,
  },

  date: {
    fontSize: 14,
    color: "gray",
  },
});
