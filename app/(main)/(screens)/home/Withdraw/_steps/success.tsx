import Container from "@/components/common/container";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

const WithdrawSuccess = () => {
  const router = useRouter();
  // **** jsx ****
  return (
    <Container
      containerStyles={{
        marginTop: 26,
        display: "flex",
        flexDirection: "column",
        rowGap: 25,
      }}
    >
      <Text style={styles.title}>Successful withdrawal!</Text>
      <Text style={styles.desc}>
        You have successfully withdrawn money! Please check the balance in the
        card management section.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(main)/home")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#281C9D",
    textAlign: "center",
    marginTop: 40,
  },
  desc: {
    width: 291,
    fontSize: 14,
    color: "#343434",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  button: {
    height: 44,
    borderRadius: 15,
    backgroundColor: "#3629B7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default WithdrawSuccess;
