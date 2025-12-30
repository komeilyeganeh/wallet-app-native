import { View } from "react-native";
import styles from "../MobileRecharge.styles";
import HeaderWrapper from "@/components/headerWrapper";
import RechargesHistory from "@/components/mobileRecharge/rechargeHistory/RechargeHistory";

const RechargesHistoryScreen = () => {
    // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="History recharges" />
        <View style={styles.content}>
           <RechargesHistory />
        </View>
      </View>
    </View>
  );
};

export default RechargesHistoryScreen;
