import { StyleSheet, View } from "react-native";
import React from "react";
import useTheme from "@src/hooks/useTheme";
import Typography from "@src/components/Typography";
import Avatar from "@src/components/Avatar";
import Button from "@src/components/Button";
import { useAppDispatch } from "@src/hooks/useReduce";
import useAuth from "@src/hooks/useAuth";
import { logoutUser } from "@src/redux/authSlice";

const ProfilePage = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { isAuth, isLoading, user } = useAuth();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      {user ? (
        <>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Avatar uri="https://picsum.photos/200/200" size={54} />

            <View style={{ flex: 1, marginLeft: 15 }}>
              <Typography variant="h3">{user.name}</Typography>

              <View style={{ height: 5 }} />

              <Typography variant="body">@{user.userName}</Typography>
            </View>
          </View>

          <View style={{ height: 10 }} />

          <Button
            title="Logout"
            onPress={() => {
              dispatch(logoutUser());
            }}
            loading={isLoading}
          />
        </>
      ) : null}
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
