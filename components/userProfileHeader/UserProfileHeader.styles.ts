import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerWrapper: {
    height: 110,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 18,
  },
  userTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  notificationSection: {
    position: "relative",
  },
  notificationCount: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 100,
    backgroundColor: "#FF4267",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationCounter: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default styles;
