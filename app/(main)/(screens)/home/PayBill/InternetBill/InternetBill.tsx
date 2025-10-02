import HeaderWrapper from "@/components/headerWrapper";
import { View } from "react-native";
import styles from "./InternetBill.styles";
import InternetBillForm from "@/components/internetBill/form";
import InfoBill from "@/components/internetBill/infoBill";
import CardSuccessScreen from "../../CreditCard/_step";

const InternetBill = () => {
  // **** return jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Internet bill" />
        <View style={styles.content}>
            {/* <InternetBillForm /> */}
            <InfoBill />
            {/* <CardSuccessScreen /> */}
        </View>
      </View>
    </View>
  );
};

export default InternetBill;
