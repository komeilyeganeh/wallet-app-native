import HeaderWrapper from "@/components/headerWrapper";
import { ScrollView, View } from "react-native";
import styles from "./InternetBill.styles";
import InternetBillForm from "@/components/internetBill/form";
import InfoBill from "@/components/internetBill/infoBill";
import CardSuccessScreen from "../../CreditCard/_step";
import { useKeyboard } from "@react-native-community/hooks";

const InternetBill = () => {
  const keyboard = useKeyboard();
  // **** return jsx ****
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0 },
      ]}
    >
      <View style={styles.wrapper}>
        <HeaderWrapper title="Internet bill" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 35 }}
        >
          <View style={styles.content}>
            {/* <InternetBillForm /> */}
            <InfoBill />
            {/* <CardSuccessScreen /> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default InternetBill;
