import React from "react";
import { useColorScheme } from "react-native";
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

const Navigation = () => {
  const Stack = createStackNavigator();
  const { mode } = useTheme();

  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (colorScheme !== mode) {
      dispatch(setTheme(colorScheme));
    }
  }, [colorScheme]);

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
        initialRouteName='Register'
      >
        <Stack.Screen name='Login' component={LoginPage} />

        <Stack.Screen name='Register' component={RegisterPage} />

        <Stack.Screen name='Root' component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  const { mode, theme } = useTheme();

  return (
    <>
      <StatusBar style='light' />

      <BottomTab.Navigator
        initialRouteName='Home'
        screenOptions={{
          header: () => <Header />,
          tabBarStyle: {
            backgroundColor: theme.colors.bottomTabBarColor,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: theme.colors.bottomTabBarActiveColor,
          tabBarInactiveTintColor: theme.colors.bottomTabBarInactiveTintColor,
        }}
      >
        <BottomTab.Screen
          name='Home'
          component={HomePage}
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-home' color={color} size={size} />
            ),
          }}
        />

        <BottomTab.Screen
          name='Profile'
          component={HomePage}
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-person' color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default Navigation;
