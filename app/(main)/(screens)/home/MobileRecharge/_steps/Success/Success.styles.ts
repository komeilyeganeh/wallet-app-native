import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 26,
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
export default styles;