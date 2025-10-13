import { View } from "react-native";
import styles from "./ChangePass.styles";
import HeaderWrapper from "@/components/headerWrapper";
import ChangePasswordForm from "@/components/setting/changePassword";


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
