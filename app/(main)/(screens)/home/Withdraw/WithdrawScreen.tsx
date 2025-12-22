import { useState } from "react";
import {
  Image,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import WithdrawForm from "./_steps/form";
import WithdrawSuccess from "./_steps/success";
import styles from "./Withdraw.styles";
import HeaderWrapper from "@/components/headerWrapper";

const WithdrawScreen = () => {
  const { width } = Dimensions.get("window");
  const [step, setStep] = useState(1);
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Withdraw" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.content}>
              <Image
                source={require("../../../../../assets/images/withdraw.webp")}
                style={{ width: width - 40, height: 220 }}
                resizeMode="contain"
              />
              {step === 1 && <WithdrawForm setStep={setStep} />}
              {step === 2 && <WithdrawSuccess />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default WithdrawScreen;
