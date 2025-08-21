import LoginForm from "@/components/auth/login/LoginForm";
import { FC } from "react";
import { Image, Text, View } from "react-native";
import styles from "./Login.styles";

const LoginScreen: FC = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
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
            source={require("../../../assets/images/login-auth-image.png")}
          />
        </View>
        <LoginForm /> 
      </View>
    </View>
  );
};

export default LoginScreen;
