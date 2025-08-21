import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  selectTrigger: {
    height: 43,
    borderRadius: 14.5,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    padding: 11.5,
    fontSize: 14,
    marginTop: 7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 14,
    color: "#CACACA",
  },
  selectedItem: {
    color: "#343434",
  },
  optionsContainer: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#FFF",
  },
  cancelContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
  },
  option: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 16,
    color: "#989898",
  },
});
export default styles;