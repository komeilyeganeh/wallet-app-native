import { lazy } from "react";
import { View } from "react-native";
import TransferForm from "./_steps/Form";
import styles from "./Transfer.styles";

const HeaderWrapper = lazy(() => import("@/components/headerWrapper/HeaderWrapper"))


const TransferScreen = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Transfer"/>
        <View style={styles.content}>
          <TransferForm />
          {/* <ConfirmTransfer /> */}
          {/* <TransferSuccess /> */}
        </View>
      </View>
    </View>
  );
};


export default TransferScreen;
