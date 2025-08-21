import { Redirect, Stack } from "expo-router";
import 'react-native-gesture-handler';

export default function RootLayout() {
  const isAuth = false;
  // **** jsx ***
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#3629B7",
        },
        contentStyle: {
          backgroundColor: "#3629B7",
        },
      }}
    >
      {isAuth ? (
        <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
      ) : (
        <Redirect href="/(auth)/login" />
      )}
    </Stack>
  );
}
