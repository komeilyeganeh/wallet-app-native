import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View } from "react-native";
import styles from "./SuccessResetPass.styles";
import SuccessResetPassword from "@/components/auth/successResetPass";
import Container from "@/components/common/container";

const SuccessResetPasswordScreen = () => {
  return (
    <Container withWrapper>
      <View style={styles.headerWrapper}>
        <Link href="/(auth)/login">
          <AntDesign name="left" color="#343434" size={20} />
        </Link>
      </View>
      <SuccessResetPassword />
    </Container>
  );
};

export default SuccessResetPasswordScreen;
