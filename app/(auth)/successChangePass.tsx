import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import SuccessResetPassword from "@/components/auth/successResetPass";
import Container from "@/components/common/container";

const SuccessResetPasswordPage = () => {
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

const styles = StyleSheet.create({
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
});

export default SuccessResetPasswordPage;
