import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3629B7",
  },
  headerWrapper: {
    height: 220,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  cardContainer: {
    paddingHorizontal: 20,
    transform: "translateY(-100px)",
  },
  chart: {
    padding: 15,
    borderRadius: 30,
    boxShadow: "0 4px 30px #3529b717",
    display: "flex",
    flexDirection: "column",
    rowGap: 4,
  },
  reportItems: {
    display: "flex",
    flexDirection: "column",
    rowGap: 14,
  },
  day: {
    fontSize: 12,
    color: "#989898",
  },
});
export default styles;