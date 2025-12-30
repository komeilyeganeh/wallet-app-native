import { View } from "react-native";
import styles from "../PayBill.styles";
import HeaderWrapper from "@/components/headerWrapper";
import RechargesHistory from "@/components/mobileRecharge/rechargeHistory/RechargeHistory";
import BillPaymentsHistory from "@/components/bill/billHistory/BillHistory";

const RechargesHistoryScreen = () => {
    // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="History recharges" />
        <View style={styles.content}>
           <BillPaymentsHistory />
        </View>
      </View>
    </View>
  );
};

export default RechargesHistoryScreen;
