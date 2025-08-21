import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  langItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    padding: 8,
  },
  langInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  checkmark: {
    color: "#3629B7",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default styles;
