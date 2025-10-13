import HeaderWrapper from "@/components/headerWrapper";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import styles from "./InternetBill.styles";
import InternetBillForm from "@/components/internetBill/form";
import InfoBill from "@/components/internetBill/infoBill";
import CardSuccessScreen from "../../CreditCard/_step";
import { useKeyboard } from "@react-native-community/hooks";

const InternetBill = () => {
  const keyboard = useKeyboard();
  // **** return jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Internet bill" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.content}>
              {/* <InternetBillForm /> */}
              <InfoBill />
              {/* <CardSuccessScreen /> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default InternetBill;
