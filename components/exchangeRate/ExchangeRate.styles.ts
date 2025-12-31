import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 18,
    paddingBottom: 20,
    display: "flex",
    rowGap: 16,
  },
  headerList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#989898",
    fontSize: 16,
    fontWeight: "semibold",
  },
  currencyRateItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC"
  },
  currencyRateTitle: {
    color: "#343434",
    fontSize: 16
  },
  currencyRateValue: {
    color: "#343434",
    fontSize: 14,
    fontWeight: "bold"
  }
});
export default styles;
