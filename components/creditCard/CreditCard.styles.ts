import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
    height: 221,
    borderRadius: 18,
    marginHorizontal: "auto",
    overflow: "hidden",
    position: "relative",
    padding: 26,
  },
  shapeOneSection: {
    position: "absolute",
    top: -59,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: "100%",
    zIndex: -1,
  },
  shapeTwoSection: {
    position: "absolute",
    top: -30,
    left: -150,
    width: 353,
    height: 353,
    borderRadius: "100%",
    zIndex: -1,
  },
  cardInfoWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  userName: {
    color: "#FFF",
    fontSize: 24,
  },
  moreInfoSection: {
    display: "flex",
    flexDirection: "column",
    rowGap: 8,
  },
  accountLevel: {
    color: "#FFF",
    fontSize: 14,
  },
  cardNumber: {
    color: "#FFF",
    fontSize: 16,
  },
  accountBalance: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default styles;
