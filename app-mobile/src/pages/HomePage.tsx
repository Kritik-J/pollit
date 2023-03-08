import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PollListItem from "@components/PollListItem";
import { polls } from "@assets/data/polls";
import Header from "@components/Header";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { theme } = useSelector((state: any) => state.ui);

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <Header />
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
  },
});
