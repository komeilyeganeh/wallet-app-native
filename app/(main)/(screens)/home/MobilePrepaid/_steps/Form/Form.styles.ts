import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 14,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
  },
  label: {
    fontSize: 12,
    color: "#989898",
  },
  input: {
    borderRadius: 14.5,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    padding: 11.5,
    fontSize: 14,
    marginTop: 7,
  },
  button: {
    height: 44,
    borderRadius: 15,
    backgroundColor: "#3629B7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#F2F1F9",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  directorContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 12,
    marginTop: 13,
  },
  directorTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#3629B7",
  },
  directorItem: {
    width: 110,
    height: 120,
    borderRadius: 15,
    boxShadow: "0 4px 30px #3529b725",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    rowGap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  directorName: {
    fontSize: 14,
    color: "#343434",
  },
  itemSelected: {
    backgroundColor: "#281C9D",
    boxShadow: "none",
  },
  valueSelected: {
    color: "#FFF",
  },
  amountItem: {
    width: 110,
    height: 60,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 30px #3529b725",
  },
  amountValue: {
    fontSize: 16,
    color: "#989898"
  }
});
export default styles;