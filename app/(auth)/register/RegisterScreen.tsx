import RegisterForm from "@/components/auth/register/RegisterForm";
import { FC } from "react";
import { Image, Text, View } from "react-native";
import styles from "./Register.styles";

const RegisterScreen: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Sign up</Text>
      </View>
      <View style={styles.registerWrapper}>
        <Text style={styles.registerWrapperTitle}>Welcome to us,</Text>
        <Text style={styles.registerWrapperSubTitle}>
          Hello there, create New account
        </Text>
        <View style={styles.imageWrapper}>
          <Image source={require("../../../assets/images/register-auth-image.png")} />
        </View>
        <RegisterForm />
      </View>
    </View>
  );
};

export default RegisterScreen;
