import ResetPasswordForm from "@/components/auth/resetPassword/ResetPassForm";
import HeaderWrapper from "@/components/headerWrapper/HeaderWrapper";
import { FC } from "react";
import { View } from "react-native";
import styles from "./ResetPassword.styles";

const ResetPasswordScreen: FC = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.resetPasswordWrapper}>
        <HeaderWrapper href="/(auth)/login" title="Change password"/>
        <ResetPasswordForm />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
