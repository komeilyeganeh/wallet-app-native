import { FC, useState } from "react";
import { View } from "react-native";
import ForgotForm from "@/components/auth/forgotPassword";
import ForgotCodeForm from "@/components/auth/forgotPassword/forgotCodeForm";
import HeaderWrapper from "@/components/headerWrapper";
import styles from "./ForgotPassword.styles";
import Container from "@/components/common/container";

const ForgotPasswordScreen: FC = () => {
  const [step, setStep] = useState(1);
  // **** jsx ****
  return (
    <Container>
      <View style={styles.forgotWrapper}>
        <HeaderWrapper href="/(auth)/login" title="Forgot password" />
        {step === 1 && <ForgotForm onChangeStep={(s: number) => setStep(s)} />}
        {step === 2 && <ForgotCodeForm />}
      </View>
    </Container>
  );
};

export default ForgotPasswordScreen;
