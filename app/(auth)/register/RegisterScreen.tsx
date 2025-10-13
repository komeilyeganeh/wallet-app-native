import { FC } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles from "./Register.styles";
import RegisterForm from "@/components/auth/register";

const RegisterScreen: FC = () => {
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
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>Sign up</Text>
        </View>
        <View style={styles.registerWrapper}>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
