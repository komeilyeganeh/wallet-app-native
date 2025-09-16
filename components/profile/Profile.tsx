import { FC } from "react";
import { Image, Text, View } from "react-native";
import styles from "./Profile.styles";

const Profile: FC<{ style?: any }> = ({ style }) => {
  // **** jsx ****
  return (
    <View style={[styles.userProfile, style]}>
      <Image
        source={require("../../assets/images/user.webp")}
        style={{ borderRadius: 100, width: 100, height: 100 }}
      />
      <Text style={styles.userName}>Push Puttichai</Text>
    </View>
  );
};

export default Profile;
