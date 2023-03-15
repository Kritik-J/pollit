import React from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "@src/pages/LoginPage";
import useTheme from "@src/hooks/useTheme";
import { useDispatch } from "react-redux";
import { setTheme } from "@src/redux/uiSlice";
import { StatusBar } from "expo-status-bar";
import HomePage from "@src/pages/HomePage";
import RegisterPage from "@src/pages/RegisterPage";

const Navigation = () => {
  const Stack = createStackNavigator();

  const colorScheme = useColorScheme();
  const { mode } = useTheme();
  const dispatch = useDispatch();

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
        }}
        initialRouteName='Login'
      >
        <Stack.Screen name='Login' component={LoginPage} />

        <Stack.Screen name='Register' component={RegisterPage} />

        <Stack.Screen name='Home' component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
