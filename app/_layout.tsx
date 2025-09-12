import { Stack } from "expo-router";

export default function RootLayout() {
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
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
