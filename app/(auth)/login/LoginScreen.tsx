import { FC, lazy } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "./Login.styles";
import { useKeyboard } from "@react-native-community/hooks";

const LoginForm = lazy(() => import("@/components/auth/login/LoginForm"));

const LoginScreen: FC = () => {
  const keyboard = useKeyboard();
  // **** jsx ****
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0 },
      ]}
    >
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Sign in</Text>
      </View>
      <View style={styles.loginWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;
