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
    color: "#333"
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
    marginTop: 20,
    fontSize: 12,
  },
  signupPageLink: {
    fontWeight: "bold",
    color: "#3629B7",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginVertical: 4,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#CACACA",
    fontSize: 12,
    marginTop: 8,
  },
  biometric: {
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  biometricButton: {
    width: 64,
    height: 64,
  },
});
export default styles;
