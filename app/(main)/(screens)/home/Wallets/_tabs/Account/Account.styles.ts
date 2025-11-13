import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  accountTab: {
    display: "flex",
    flexDirection: "column",
    rowGap: 32,
  },
  accountInfo: {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
  },
  accountInfoItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343434",
  },
  accountSubTitle: {
    fontSize: 12,
    color: "#979797",
  },
  accountValue: {
    color: "#3629B7",
    fontWeight: "bold",
    fontSize: 12,
  },
});
export default styles;