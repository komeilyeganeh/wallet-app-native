import { View } from "react-native";
import styles from "../MobileRecharge.styles";
import HeaderWrapper from "@/components/headerWrapper";
import RechargesHistory from "@/components/mobileRecharge/rechargeHistory/RechargeHistory";
import Container from "@/components/common/container";

const RechargesHistoryScreen = () => {
    // **** jsx ****
  return (
    <Container withWrapper>
        <HeaderWrapper title="History recharges" />
        <View style={styles.content}>
           <RechargesHistory />
        </View>
    </Container>
  );
};

export default RechargesHistoryScreen;
