import { View } from "react-native";
import styles from "./MobileRecharge.styles";
import HeaderWrapper from "@/components/headerWrapper";
import MobileRechargeForm from "@/components/mobileRecharge/MobileRechargeForm";

const PurchaseChargeScreen = () => {
    // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Mobile Recharge"/>
        <View style={styles.content}>
           <MobileRechargeForm />
        </View>
      </View>
    </View>
  );
};

export default PurchaseChargeScreen;
