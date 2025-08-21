import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
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
  title: {
    fontSize: 12,
    color: "#989898",
    marginTop: 26
  },
  item: {
    display: "flex",
    flexDirection: "row",
    columnGap: 12,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    marginTop: 10
  },
  titleText: {
    fontSize: 16,
    color: "#343434"
  },
  descText: {
    fontSize: 12,
    color: "#989898"
  },
  addButton: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#3629B7",
    bottom: 25,
    right: 25,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default styles;