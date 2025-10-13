import { FC, lazy } from "react";
import {
  Image,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./Register.styles";

const RegisterForm = lazy(
  () => import("@/components/auth/register/RegisterForm")
);

const RegisterScreen: FC = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Sign up</Text>
      </View>
      <View style={styles.registerWrapper}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ flexGrow: 1 }}
        >
          <Text style={styles.registerWrapperTitle}>Welcome to us,</Text>
          <Text style={styles.registerWrapperSubTitle}>
            Hello there, create New account
          </Text>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../../assets/images/register-auth.webp")}
              style={{ width: 213, height: 165 }}
            />
          </View>
          <RegisterForm />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default RegisterScreen;
