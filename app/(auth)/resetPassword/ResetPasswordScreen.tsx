import { FC, lazy } from "react";
import { View } from "react-native";
import styles from "./ResetPassword.styles";

const ResetPasswordForm = lazy(
  () => import("@/components/auth/resetPassword/ResetPassForm")
);
const HeaderWrapper = lazy(
  () => import("@/components/headerWrapper/HeaderWrapper")
);

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
