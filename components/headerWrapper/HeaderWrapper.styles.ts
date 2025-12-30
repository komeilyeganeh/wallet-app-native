import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    paddingBottom: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343434",
  },
});
export default styles;
