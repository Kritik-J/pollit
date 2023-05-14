import React from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useTheme from "@src/hooks/useTheme";
import { setTheme } from "@src/redux/uiSlice";
import { StatusBar } from "expo-status-bar";
import HomePage from "@src/pages/HomePage";
import LoginPage from "@src/pages/auth/LoginPage";
import RegisterPage from "@src/pages/auth/RegisterPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Header from "@src/components/Header";
import { useAppDispatch } from "@src/hooks/useReduce";
import ProfilePage from "@src/pages/ProfilePage";
import CreatePollPage from "@src/pages/CreatePollPage";
import PollPage from "@src/pages/PollPage";
import useAuth from "@src/hooks/useAuth";
import { getMyProfile } from "@src/redux/authSlice";
import Typography from "@src/components/Typography";
import {
  HomeFilledIcon,
  HomeIcon,
  ProfileFilledIcon,
  ProfileIcon,
} from "@src/components/Svg";
import ForgotPasswordPage from "@src/pages/auth/ForgotPasswordPage";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const Navigation = () => {
  const { mode, theme } = useTheme();
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { isAuth, isLoadingProfile } = useAuth();

  React.useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  React.useEffect(() => {
    if (colorScheme !== mode) {
      dispatch(setTheme(colorScheme));
    }
  }, [colorScheme]);

  const Loader = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.backgroundColor,
        }}
      >
        <ActivityIndicator size="large" color="#537FE7" />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,

          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
        initialRouteName={!isLoadingProfile && isAuth ? "Root" : "Auth"}
      >
        {isLoadingProfile ? (
          <Stack.Screen name="Loading" component={Loader} />
        ) : (
          <>
            {isAuth ? (
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            ) : (
              <Stack.Screen name="Auth" component={AuthNavigator} />
            )}

            <Stack.Screen name="Poll" component={PollPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginPage} />

      <Stack.Screen name="Register" component={RegisterPage} />

      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
    </Stack.Navigator>
  );
};

export const BottomTabNavigator = () => {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style="light" />

      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />,
          tabBarStyle: {
            backgroundColor: theme.colors.bottomTabBarColor,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: theme.colors.bottomTabBarActiveTintColor,
          // tabBarActiveTintColor: theme.colors.bottomTabBarInactiveTintColor,
          tabBarInactiveTintColor: theme.colors.bottomTabBarInactiveTintColor,
          tabBarShowLabel: false,
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomePage}
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <HomeFilledIcon fill={color} />
              ) : (
                <HomeIcon fill={color} />
              ),
          }}
        />

        <BottomTab.Screen
          name="Create"
          component={CreatePollPage}
          options={{
            title: "Create",
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-add-circle-outline" color={color} size={32} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            title: "Profile",

            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ProfileFilledIcon fill={color} />
              ) : (
                <ProfileIcon fill={color} />
              ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default Navigation;
