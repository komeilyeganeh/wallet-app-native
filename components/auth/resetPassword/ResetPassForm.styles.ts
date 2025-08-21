import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 31,
    borderRadius: 15,
    boxShadow: "0 4px 30px 0 #3529b711",
    paddingVertical: 24,
    paddingHorizontal:15
  },
  subTitle: {
    fontSize: 12,
    color: "#989898",
    marginBottom: 7,
  },
  helpText: {
    fontSize: 14,
    color: "#343434",
  },
  input: {
    borderRadius: 14.5,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    padding: 11.5,
    fontSize: 14,
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
});
export default styles;