import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddSaveOnlineSuccess = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require("../../../../../../assets/images/add-save-online.png")}
          style={{ marginHorizontal: "auto" }}
        />
        <Text style={styles.title}>Save online successfully!</Text>
        <Text style={styles.desc}>
          Congratulations! You have save money online successfully!
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
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
    paddingTop: 100,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    rowGap: 25,
  },
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
