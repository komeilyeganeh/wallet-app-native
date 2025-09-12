import { Stack } from "expo-router";

export default function RootLayout() {
  // const isAuth = false;
  // if (!isAuth) {
  //   return <Redirect href="/(auth)/login" />
  // }
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
      initialRouteName="(main)/(tabs)"
    >
      <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
