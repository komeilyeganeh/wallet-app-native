import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabsContainer: {
    marginTop: 29,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabButton: {
    width: 155,
    height: 44,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 30px #3529b71e",
  },
  tabButtonActive: {
    backgroundColor: "#3629B7",
    boxShadow: "none",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#989898",
  },
  tabButtonTextActive: {
    color: "#FFF",
  },
  content: {
    marginTop: 14,
  },
});
export default styles;