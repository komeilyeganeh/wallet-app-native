
import HeaderWrapper from "@/components/headerWrapper/HeaderWrapper";
import { useState } from "react";
import { Image, View } from "react-native";
import WithdrawForm from "./_steps/form";
import WithdrawSuccess from "./_steps/success";
import styles from "./Withdraw.styles";

const WithdrawScreen = () => {
  const [step, setStep] = useState(1);
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Withdraw" />
        <View style={styles.content}>
          <Image
            source={require("../../../../../assets/images/withdraw.png")}
          />
          {step === 1 && <WithdrawForm setStep={() => setStep(2)} />}
          {step === 2 && <WithdrawSuccess />}
        </View>
      </View>
    </View>
  );
};

export default WithdrawScreen;
