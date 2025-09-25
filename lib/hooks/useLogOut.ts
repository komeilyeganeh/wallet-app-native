import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const useLogOut = () => {
  const router = useRouter();
  const logOut = async () => {
    await SecureStore.deleteItemAsync("auth_token");
    router.replace("/");
  };

  return { logOut };
};
