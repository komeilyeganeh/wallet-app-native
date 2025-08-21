import ForgotForm from "@/components/auth/forgotPassword";
import ForgotCodeForm from "@/components/auth/forgotPassword/forgotCodeForm";
import HeaderWrapper from "@/components/headerWrapper/HeaderWrapper";
import { FC, useState } from "react";
import { View } from "react-native";
import styles from "./ForgotPassword.styles";

const ForgotPasswordScreen: FC = () => {
    const [step, setStep] = useState(1);
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.forgotWrapper}>
        <HeaderWrapper href="/(auth)/login" title="Forgot password"/>
        {step === 1 && <ForgotForm onChangeStep={(s: number) => setStep(s)}/>}
        {step === 2 && <ForgotCodeForm />}
      </View>
    </View>
  );
};



export default ForgotPasswordScreen;
