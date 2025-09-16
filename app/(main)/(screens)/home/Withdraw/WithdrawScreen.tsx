import { lazy, useState } from "react";
import { Image, View, Dimensions } from "react-native";
import WithdrawForm from "./_steps/form";
import WithdrawSuccess from "./_steps/success";
import styles from "./Withdraw.styles";
import { useKeyboard } from "@react-native-community/hooks";

const HeaderWrapper = lazy(() => import("@/components/headerWrapper/HeaderWrapper"))


const WithdrawScreen = () => {
  const { width } = Dimensions.get("window");
  const keyboard = useKeyboard();
  const [step, setStep] = useState(1);
  // **** jsx ****
  return (
    <View style={[styles.container, { paddingBottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0 }]}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Withdraw" />
        <View style={styles.content}>
          <Image
            source={require("../../../../../assets/images/withdraw.webp")}
            style={{ width: width - 40, height: 220 }}
            resizeMode="contain"
          />
          {step === 1 && <WithdrawForm setStep={() => setStep(2)} />}
          {step === 2 && <WithdrawSuccess />}
        </View>
      </View>
    </View>
  );
};

export default WithdrawScreen;
