import { FlatList, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import PollListItem from "@components/PollListItem";
import { polls } from "@assets/data/polls";
import Button from "@components/Button";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={polls}
        renderItem={({ item }) => (
          <PollListItem poll={item} isLast={polls.length === item.id} />
        )}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
});
