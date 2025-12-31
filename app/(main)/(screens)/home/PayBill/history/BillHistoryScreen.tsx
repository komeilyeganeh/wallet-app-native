import { View } from "react-native";
import styles from "../PayBill.styles";
import HeaderWrapper from "@/components/headerWrapper";
import BillPaymentsHistory from "@/components/bill/billHistory/BillHistory";
import Container from "@/components/common/container";

const RechargesHistoryScreen = () => {
    // **** jsx ****
  return (
    <Container withWrapper>
        <HeaderWrapper title="History recharges" />
        <View style={styles.content}>
           <BillPaymentsHistory />
        </View>
    </Container>
  );
};

export default RechargesHistoryScreen;
