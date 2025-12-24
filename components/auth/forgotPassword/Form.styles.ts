import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 21
  },
  subTitle: {
    fontSize: 12,
    color: "#989898",
    marginBottom: 15.5,
  },
  helpText: {
    fontSize: 13,
    color: "#343434",
    marginTop: 5
  },
  input: {
    borderRadius: 14.5,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    padding: 11.5,
    fontSize: 14,
    color: "#333",
  },

  submitButton: {
    backgroundColor: "#3629B7",
    height: 44,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  submitButtonDisabled: {
    backgroundColor: "#F2F1F9",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginVertical: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    lineHeight: 16,
  },
  backButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "#3629B7",
    fontSize: 14,
    fontWeight: "500",
  },
});
export default styles;
