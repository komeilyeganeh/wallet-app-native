import { lazy } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View } from "react-native";
import styles from "./SuccessResetPass.styles";

const SuccessResetPassword = lazy(() => import("@/components/auth/successResetPass/SuccessResetPass"))

const SuccessResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Link href="/(auth)/login">
            <AntDesign name="left" color="#343434" size={20} />
          </Link>
        </View>
        <SuccessResetPassword />
      </View>
    </View>
  );
};

export default SuccessResetPasswordScreen;
