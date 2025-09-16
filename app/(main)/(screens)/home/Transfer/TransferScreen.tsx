import { lazy } from "react";
import { View } from "react-native";
import TransferForm from "./_steps/Form";
import styles from "./Transfer.styles";
import { useKeyboard } from "@react-native-community/hooks";

const HeaderWrapper = lazy(() => import("@/components/headerWrapper/HeaderWrapper"))


const TransferScreen = () => {
  const keyboard = useKeyboard();
  // **** jsx ****
  return (
    <View style={[styles.container, { paddingBottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0 }]}>
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
