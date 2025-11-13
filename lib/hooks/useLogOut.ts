import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { tokenStorage } from "../storage/tokenStorage";

export const useLogOut = () => {
  const router = useRouter();
  const logOut = async () => {
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userData");
    await tokenStorage.removeToken();
    router.replace("/");
  };

  return { logOut };
};
