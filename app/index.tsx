import { useAuth } from "@/lib/hooks/useAuth";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { SkypeIndicator } from "react-native-indicators";

export default function Index() {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View>
        <SkypeIndicator color="#0000ff" size={40} />
      </View>
    );
  }

  if (!isAuth) {
    return <Redirect href="/(auth)/login" />;
  } else {
    return <Redirect href="/(main)/(tabs)/home" />;
  }
}
