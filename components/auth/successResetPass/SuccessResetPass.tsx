import { Link } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./SuccessResetPassword.styles";

const SuccessResetPassword: FC = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../../assets/images/success-reset.png")} />
      </View>
      <Text style={styles.title}>Change password successfully!</Text>
      <Text style={styles.subTitle}>
        You have successfully change password. Please use the new password when
        Sign in.
      </Text>
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Sign in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default SuccessResetPassword;
