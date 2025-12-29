import { View } from "react-native";
import HeaderWrapper from "@/components/headerWrapper";
import BillInquiryForm from "@/components/bill/BillInquireForm";
import styles from "../PayBill.styles";

const MobileBill = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Check the bill (Water)" />
        <BillInquiryForm defaultBillType="WATER" providerName="Water" />
      </View>
    </View>
  );
};

export default MobileBill;
