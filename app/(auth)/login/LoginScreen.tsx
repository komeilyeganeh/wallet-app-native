import { FC, lazy } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./Login.styles";

const LoginForm = lazy(() => import("@/components/auth/login/LoginForm"));

const LoginScreen: FC = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Sign in</Text>
      </View>
      <View style={styles.loginWrapper}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ flexGrow: 1 }}
        >
          <Text style={styles.loginWrapperTitle}>Welcome Back</Text>
          <Text style={styles.loginWrapperSubTitle}>
            Hello there, sign in to continue
          </Text>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../../assets/images/login-auth.webp")}
              style={{ width: 213, height: 165 }}
            />
          </View>
          <LoginForm />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;
