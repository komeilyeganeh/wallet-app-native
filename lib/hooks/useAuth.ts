import { useEffect, useState } from "react";
import { tokenStorage } from "../storage/tokenStorage";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await tokenStorage.getToken();      
      setIsAuth(!!token);
      setIsLoading(false)
    };
    checkAuth();
  }, []);

  return { isAuth, isLoading }
};
