import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Typography from "@src/components/Typography";
import { useNavigation } from "@react-navigation/native";
import { polls } from "@assets/data/polls";
import Radio from "@src/components/Radio";
import Checkbox from "@src/components/Checkbox";
import PollTextInput from "@src/components/PollTextInput";
import Button from "@src/components/Button";

const PollPage = () => {
  const { theme } = useTheme();
  const nav = useNavigation();

  function navigateBack() {
    nav.goBack();
  }

  const poll = polls[0];

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

      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <Typography variant='h2'>{poll.title}</Typography>

        <View style={{ height: 20 }} />

        {poll.questions &&
          poll.questions.map((item, index) => (
            <View
              key={index}
              style={{
                marginTop: index === 0 ? 0 : 15,
              }}
            >
              <Typography variant='h3'>{item.title}</Typography>

              <View style={{ height: 10 }} />

              {item.inputType === "radio" && item.options && (
                <Radio options={item.options} />
              )}

              {item.inputType === "checkbox" && item.options && (
                <Checkbox options={item.options} />
              )}

              {item.inputType === "text" && <PollTextInput />}
            </View>
          ))}

        <View style={{ height: 20 }} />

        <Button title='Answer' onPress={() => {}} />
      </ScrollView>
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
    flexGrow: 1,
    padding: 10,
  },

  questionsList: {},
});
