import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const useLogOut = () => {
  const router = useRouter();
  const logOut = async () => {
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userData");
    await SecureStore.deleteItemAsync("auth_token");
    router.replace("/");
  };

  return { logOut };
};
