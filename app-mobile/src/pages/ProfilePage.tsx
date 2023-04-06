import { StyleSheet, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import Typography from "@src/components/Typography";
import Avatar from "@src/components/Avatar";

const ProfilePage = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <Avatar uri='https://picsum.photos/200/200' size={64} />

        <View style={{ flex: 1, marginLeft: 15 }}>
          <Typography variant='h3'>John Doe</Typography>

          <View style={{ height: 5 }} />

          <Typography variant='body'>@johndoe</Typography>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
