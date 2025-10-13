import { FC } from "react";
import { View } from "react-native";
import ResetPasswordForm from "@/components/auth/resetPassword";
import HeaderWrapper from "@/components/headerWrapper";
import styles from "./ResetPassword.styles";

const ResetPasswordScreen: FC = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.resetPasswordWrapper}>
        <HeaderWrapper href="/(auth)/login" title="Change password" />
        <ResetPasswordForm />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
