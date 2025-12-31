import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 24
  },
  card: {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
    padding: 16,
    marginBottom: 15
  },
  cardInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343434"
  },
  contentTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#989898"
  },
  contentValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#281C9D"
  }
});
export default styles;