import { View } from "react-native";
import styles from "./MobileRecharge.styles";
import HeaderWrapper from "@/components/headerWrapper";
import MobileRechargeForm from "@/components/mobileRecharge/MobileRechargeForm";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import Container from "@/components/common/container";

const PurchaseChargeScreen = () => {
  // **** jsx ****
  return (
    <Container withWrapper>
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
    </Container>
  );
};

export default PurchaseChargeScreen;
