import { FC, lazy, useState } from "react";
import { View } from "react-native";
import styles from "./ForgotPassword.styles";

const ForgotForm = lazy(() => import("@/components/auth/forgotPassword"));
const ForgotCodeForm = lazy(
  () => import("@/components/auth/forgotPassword/forgotCodeForm")
);
const HeaderWrapper = lazy(
  () => import("@/components/headerWrapper/HeaderWrapper")
);

const ForgotPasswordScreen: FC = () => {
  const [step, setStep] = useState(1);
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.forgotWrapper}>
        <HeaderWrapper href="/(auth)/login" title="Forgot password" />
        {step === 1 && <ForgotForm onChangeStep={(s: number) => setStep(s)} />}
        {step === 2 && <ForgotCodeForm />}
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
