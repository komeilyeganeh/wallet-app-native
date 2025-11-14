import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  shapeOneSection: {
    width: 180,
    height: 180,
    borderRadius: 100,
    position: "absolute",
    top: -70,
    left: -50,
  },
  shapeTwoSection: {
    width: 180,
    height: 180,
    borderRadius: 100,
    position: "absolute",
    bottom: -80,
    right: -60,
  },
  cardInfoWrapper: {
    padding: 25,
    flex: 1,
    justifyContent: "space-between",
  },
  userName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  moreInfoSection: {
    display: "flex",
    rowGap: 10,
  },
  accountLevel: {
    color: "#FFF",
    fontSize: 12,
  },
  cardNumber: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  accountBalance: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  selectedIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF4267",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default styles;