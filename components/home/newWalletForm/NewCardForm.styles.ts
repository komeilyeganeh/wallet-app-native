import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 26,
    display: "flex",
    flexDirection: "column",
    padding: 15,
    borderRadius: 15,
    boxShadow: "0 4px 30px #3529b718",
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
    color: "#333",
  },
  button: {
    height: 44,
    borderRadius: 15,
    backgroundColor: "#3629B7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  buttonDisabled: {
    backgroundColor: "#F2F1F9",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  loadingText: {
    color: "#e95f5fff",
    fontSize: 12,
    marginTop: 5,
    fontStyle: "italic",
  },
});
export default styles;
