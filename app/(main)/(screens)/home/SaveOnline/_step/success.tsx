import Container from "@/components/common/container";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddSaveOnlineSuccess = () => {
  // **** jsx ****
  return (
    <Container
      withWrapper
      wrapperStyles={{ display: "flex", flexDirection: "column", rowGap: 25 }}
    >
      <Image
        source={require("../../../../../../assets/images/add-save-online.webp")}
        style={{ marginHorizontal: "auto", width: 316, height: 234 }}
      />
      <Text style={styles.title}>Save online successfully!</Text>
      <Text style={styles.desc}>
        Congratulations! You have save money online successfully!
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
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

export default AddSaveOnlineSuccess;
