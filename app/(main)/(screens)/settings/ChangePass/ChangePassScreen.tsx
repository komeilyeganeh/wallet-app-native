import { lazy } from "react";
import { View } from "react-native";
import styles from "./ChangePass.styles";

const HeaderWrapper = lazy(() => import("@/components/headerWrapper/HeaderWrapper"))
const ChangePasswordForm = lazy(() => import("@/components/setting/changePassword/ChangePassForm"))


const ChangePasswordScreen = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Change password" />
        <ChangePasswordForm />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
