// hooks/useUserData.ts
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  name?: string;
  email?: string;
}

export const useUserData = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [userData, storedUserId] = await Promise.all([
        AsyncStorage.getItem("userData"),
        AsyncStorage.getItem("userId")
      ]);

      if (userData !== null) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }

      if (storedUserId !== null) {
        const parsedUserId = JSON.parse(storedUserId);
        setUserId(parsedUserId);
      }
    } catch (err) {
      console.error("Error loading user data:", err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = () => {
    loadUserData();
  };

  const clearUserData = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem("userData"),
        AsyncStorage.removeItem("userId")
      ]);
      setUser(null);
      setUserId(null);
    } catch (err) {
      console.error("Error clearing user data:", err);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return {
    user,
    userId,
    loading,
    error,
    refreshUserData,
    clearUserData
  };
};