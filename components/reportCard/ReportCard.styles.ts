import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    paddingVertical: 8,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
    display: "flex",
    rowGap: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343434",
    flex: 1,
  },
  statusIndicator: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  messageDesc: {
    fontSize: 12,
    color: "#52D5BA", // رنگ پیش‌فرض برای موفق
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;