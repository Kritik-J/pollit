import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PollListItem from "@components/PollListItem";
import { polls } from "@assets/data/polls";
import useTheme from "@src/hooks/useTheme";

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <FlatList
        data={polls}
        renderItem={({ item }) => (
          <PollListItem poll={item} isLastItem={polls.length === item.id} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
