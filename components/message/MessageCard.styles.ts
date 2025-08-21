import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
    boxShadow: "0 4px 30px 0 #3529b71e",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    padding: 12,
    gap: 12,
  },
  icon: {
    width: 40,
    padding: 5,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  messageTitle: {
    fontSize: 16,
    color: "#343434",
  },
  messageDesc: {
    fontSize: 12,
    color: "#989898",
  },
  date: {
    fontSize: 12,
    color: "#989898",
  },
});
export default styles;
