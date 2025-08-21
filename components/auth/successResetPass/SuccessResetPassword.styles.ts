import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 31,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 33,
    color: "#281C9D",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: "#343434",
    marginTop: 23,
  },
  link: {
    backgroundColor: "#3629B7",
    height: 44,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
  },
  linkText: {
    fontSize: 16,
    color: "#FFF",
  },
});
export default styles;
