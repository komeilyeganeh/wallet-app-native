import { FC } from "react";
import { View } from "react-native";
import ResetPasswordForm from "@/components/auth/resetPassword";
import HeaderWrapper from "@/components/headerWrapper";
import styles from "./ResetPassword.styles";
import Container from "@/components/common/container";

const ResetPasswordScreen: FC = () => {
  // **** jsx ****
  return (
    <Container>
      <View style={styles.resetPasswordWrapper}>
        <HeaderWrapper href="/(auth)/login" title="Change password" />
        <ResetPasswordForm />
      </View>
    </Container>
  );
};

export default ResetPasswordScreen;
