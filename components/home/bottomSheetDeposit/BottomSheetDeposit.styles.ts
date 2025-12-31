import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
 bottomSheetHandle: {
    backgroundColor: "#CCC",
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  bottomSheetBackground: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetContent: {
    paddingHorizontal: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  selectedWalletCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  selectedWalletTitle: {
    fontSize: 14,
    color: "#6C757D",
    marginBottom: 8,
    fontWeight: "500",
  },
  walletInfo: {
    marginTop: 4,
  },
  walletBank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  walletNumber: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  walletBalance: {
    fontSize: 14,
    color: "#4CAF50",
    marginTop: 4,
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  helperText: {
    fontSize: 12,
    color: "#6C757D",
    marginTop: 6,
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 6,
  },
  hiddenInput: {
    display: "none",
  },
  sheetActions: {
    marginTop: 20,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  submitButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
  sheetLoading: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
  },
  sheetLoadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
})

export default styles;