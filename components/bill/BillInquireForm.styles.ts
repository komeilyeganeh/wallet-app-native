import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  formContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 14,
    rowGap: 25,
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
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#3629B7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#FFE5E5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  errorMessage: {
    color: "#FF3B30",
    fontSize: 14,
    textAlign: "center",
  },
  billInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  billInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  billInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  billInfoLabel: {
    fontSize: 12,
    color: "#989898",
  },
  billInfoValue: {
    fontSize: 12,
    color: "#343434",
    fontWeight: 600,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 10,
    backgroundColor: "#F8F9FF",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  amountLabel: {
    fontSize: 17,
    color: "#343434",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  amountValue: {
    fontSize: 24,
    color: "#FF4267",
    fontWeight: "bold",
  },
  payButton: {
    height: 50,
    backgroundColor: "#3629B7",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;