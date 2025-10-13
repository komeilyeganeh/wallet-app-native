import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import SuccessResetPassword from "@/components/auth/successResetPass";

const SuccessResetPasswordPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Link href="/(auth)/login">
            <AntDesign name="left" color="#343434" size={20} />
          </Link>
        </View>
        <SuccessResetPassword />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
});

export default SuccessResetPasswordPage;
