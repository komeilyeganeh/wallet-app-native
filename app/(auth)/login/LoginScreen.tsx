import { FC } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LoginForm from "@/components/auth/login";
import styles from "./Login.styles";

const LoginScreen: FC = () => {
  
  // **** jsx ****
  return (
   <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, }}
      >
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Sign in</Text>
      </View>
      <View style={styles.loginWrapper}>
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
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
