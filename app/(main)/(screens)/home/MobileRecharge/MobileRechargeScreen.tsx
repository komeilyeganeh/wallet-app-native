import { View } from "react-native";
import styles from "./MobileRecharge.styles";
import HeaderWrapper from "@/components/headerWrapper";
import MobileRechargeForm from "@/components/mobileRecharge/MobileRechargeForm";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";

const PurchaseChargeScreen = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper
          title="Mobile Recharge"
          icon={
            <Link href="/(main)/(screens)/home/MobileRecharge/history/RechargesHistoryScreen">
              <FontAwesome5 name="history" size={22} color="black" />
            </Link>
          }
        />
        <View style={styles.content}>
          <MobileRechargeForm />
        </View>
      </View>
    </View>
  );
};

export default PurchaseChargeScreen;
