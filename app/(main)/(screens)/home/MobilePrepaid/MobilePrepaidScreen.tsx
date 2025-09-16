import { View } from "react-native";
import styles from "./MobilePrepaid.styles";
// import ConfirmPrepaidScreen from "./_steps/Confirm";
// import PrepaidSuccessScreen from "./_steps/Success";
import PrepaidFormScreen from "./_steps/Form";
import { lazy } from "react";

const HeaderWrapper = lazy(() => import("@/components/headerWrapper/HeaderWrapper"))

const MobilePrepaidScreen = () => {
    // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Mobile prepaid"/>
        <View style={styles.content}>
           <PrepaidFormScreen />
           {/* <ConfirmPrepaidScreen /> */}
           {/* <PrepaidSuccessScreen /> */}
        </View>
      </View>
    </View>
  );
};

export default MobilePrepaidScreen;
