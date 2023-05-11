import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import PollListItem from "@components/PollListItem";
import useTheme from "@src/hooks/useTheme";
import { API_URL } from "@src/utils/constants/api";
import axios from "axios";
import Typography from "@src/components/Typography";

const HomePage = () => {
  const { theme } = useTheme();
  const [polls, setPolls] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getPolls = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/polls`);

      setPolls(data.polls);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPolls();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <>
          {polls && polls.length > 0 ? (
            <FlatList
              data={polls}
              renderItem={({ item, index }) => (
                <PollListItem
                  poll={item}
                  isLastItem={polls.length === index + 1}
                  key={index}
                />
              )}
              refreshing={loading}
              onRefresh={getPolls}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">No polls found</Typography>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
