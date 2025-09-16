import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    height: 44,
    backgroundColor: "#3629B7",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  cardsWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15
  }
});
export default styles;