import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  linksContainer: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    rowGap: 28,
  },
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
});
export default styles;