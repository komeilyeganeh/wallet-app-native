import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 31,
  },
  input: {
    borderRadius: 14.5,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    padding: 11.5,
    fontSize: 14,
  },
  section: {
    display: "flex",
    flexDirection: "row",
    columnGap: 6,
    fontSize: 14,
  },
  checkBox: {
    borderColor: "#BFBFBF",
    borderRadius: 3,
    width: 16,
    height: 16,
  },
  link: {
    color: "#3629B7",
    fontWeight: "bold",
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#3629B7",
    height: 44,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
  },
  submitButtonDisabled: {
    backgroundColor: "#F2F1F9",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  haveAccountText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 12,
  },
  loginPageLink: {
    fontWeight: "bold",
    color: "#3629B7",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginVertical: 4
  }
});
export default styles;