import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3629B7",
  },
  headerWrapper: {
    height: 110,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 18,
  },
  userTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  notificationSection: {
    position: "relative",
  },
  notificationCount: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 100,
    backgroundColor: "#FF4267",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationCounter: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  contentWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 24,
  },
  depositButton: {
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    padding: 10,
    marginTop: 5,
    elevation: 3,
    shadowColor: "#000000a6",
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  depositButtonDisabled: {
    opacity: 0.5,
  },
  depositButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  depositIconContainer: {
    backgroundColor: "rgba(48, 48, 48, 0.11)",
    borderRadius: 50,
    padding: 5,
    marginRight: 12,
  },
  depositTextContainer: {
    flex: 1,
  },
  depositTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  depositWarning: {
    color: "#e42a2aff",
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },
  depositChevron: {
    opacity: 0.8,
  },
  cardsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 14,
  },
  // Bottom Sheet Styles
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
  carousel: {
    justifyContent: "center",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  emptyContainer: {
    backgroundColor: "#ffffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#FA812F",
  },
  emptyText: {
    color: "#FA812F",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
  errorContainer: {
    backgroundColor: "#ffeaea",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#ff4267",
  },
});
export default styles;