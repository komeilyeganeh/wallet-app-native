import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  button: {
    height: 44,
    borderRadius: 15,
    backgroundColor: "#3629B7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  dateText: {
    fontSize: 12,
    color: "#989898",
    textAlign: "center",
    marginTop: 10
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
    marginTop: 25
  },
  infoTitle: {
    fontSize: 16,
    color: "#343434",
    fontWeight: 700
  },
  infoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  infoItemKey: {
    fontSize: 12,
    color: "#989898"
  },
  infoItemValue: {
    fontSize: 12,
    color: "#343434",
    fontWeight: 600
  },
  infoItemAmountKey: {
    fontSize: 16,
    color: "#979797"
  },
  infoItemAmountValue: {
    fontSize: 17,
    color: "#3629B7",
    fontWeight: "bold"
  },
  buttonDisabled: {
    backgroundColor: "#F2F1F9",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
export default styles;