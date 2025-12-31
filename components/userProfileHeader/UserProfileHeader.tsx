import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { Image, Text, View } from "react-native";
import styles from "./UserProfileHeader.styles"
import { IUserProfileHeader } from "@/types/components/userProfileHeader.types";

const UserProfileHeader: FC<IUserProfileHeader> = ({ user }) => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.userWrapper}>
        <Image
          source={require("../../assets/images/user.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text style={styles.userTitle}>Hi, {user?.name || "User"} !</Text>
      </View>
      <View style={styles.notificationSection}>
        <MaterialIcons name="notifications" size={26} color="white" />
        <View style={styles.notificationCount}>
          <Text style={styles.notificationCounter}>3</Text>
        </View>
      </View>
    </View>
  );
};

export default UserProfileHeader;
