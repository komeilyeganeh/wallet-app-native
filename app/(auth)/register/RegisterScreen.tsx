import { FC, lazy } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "./Register.styles";
import { useKeyboard } from "@react-native-community/hooks";

const RegisterForm = lazy(
  () => import("@/components/auth/register/RegisterForm")
);

const RegisterScreen: FC = () => {
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
        <Text style={styles.headerTitle}>Sign up</Text>
      </View>
      <View style={styles.registerWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterScreen;
