import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  registerWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 20,
  },
  registerWrapperTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3629B7",
  },
  registerWrapperSubTitle: {
    fontSize: 12,
    color: "#343434",
  },
  imageWrapper: {
    marginHorizontal: "auto",
    marginVertical: 31,
    display: "flex",
    justifyContent: "center",
  },
});
export default styles;