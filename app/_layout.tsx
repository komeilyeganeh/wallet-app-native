import { Stack } from "expo-router";
import { useEffect } from "react";
import { I18nManager } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RNRestart from "react-native-restart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "react-native-toast-notifications";

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    const forceRTL = () => {
      if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);

        setTimeout(() => {
          RNRestart.restart();
        }, 100);
      }
    };

    forceRTL();
  }, []);
  // **** jsx ***
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
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
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(main)/(tabs)"
                options={{ headerShown: false }}
              />
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}
