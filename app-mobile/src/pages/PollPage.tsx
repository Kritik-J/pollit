import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Typography from "@src/components/Typography";
import { useNavigation } from "@react-navigation/native";

const PollPage = () => {
  const { theme } = useTheme();
  const nav = useNavigation();

  function navigateBack() {
    nav.goBack();
  }

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
          name='arrowleft'
          size={24}
          color='white'
          onPress={navigateBack}
        />

        <Entypo name='dots-three-vertical' size={20} color='white' />
      </View>

      <View style={styles.bodyContainer}>
        <Typography variant='h2'>Poll Title</Typography>
      </View>
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
    flex: 1,
    padding: 10,
  },
});
