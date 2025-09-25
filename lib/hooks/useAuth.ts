import { useEffect, useState } from "react";
import { tokenStorage } from "../storage/tokenStorage";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await tokenStorage.getToken();
      setIsAuth(!!token);
    };
    checkAuth();
  }, []);

  return { isAuth }
};
