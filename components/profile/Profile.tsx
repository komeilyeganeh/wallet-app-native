import { FC, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import styles from "./Profile.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile: FC<{ style?: any }> = ({ style }) => {
   const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      
      if (userData !== null) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };
  // **** jsx ****
  return (
    <View style={[styles.userProfile, style]}>
      <Image
        source={require("../../assets/images/user.png")}
        style={{ borderRadius: 100, width: 100, height: 100 }}
      />
      <Text style={styles.userName}>{user?.name}</Text>
    </View>
  );
};

export default Profile;
