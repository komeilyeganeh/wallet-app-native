import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    linkItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkTitleWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: 6,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  linkSubTitle: {
    fontSize: 12,
    color: "#979797",
  },
})

export default styles;