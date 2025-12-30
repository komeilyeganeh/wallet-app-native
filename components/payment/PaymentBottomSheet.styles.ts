import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
     shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 30,
  },
  bottomSheetIndicator: {
    backgroundColor: "#CBCBCB",
    width: 40,
    height: 4,
  },
  bottomSheetContent: {
    padding: 20,
  },
  paymentSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  paymentSheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
    fontWeight: "300",
  },
  paymentSummary: {
    backgroundColor: "#F8F9FF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentSummaryLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  paymentSummaryAmount: {
    fontSize: 22,
    color: "#3629B7",
    fontWeight: "bold",
  },
  paymentForm: {
    marginBottom: 20,
  },
  paymentInputGroup: {
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  paymentInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    minHeight: 80,
    textAlignVertical: "top",
  },
  paymentErrorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 5,
  },
  billDetails: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  billDetailsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  billDetailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  billDetailLabel: {
    color: "#666",
    fontSize: 14,
  },
  billDetailValue: {
    fontWeight: "500",
    color: "#333",
    fontSize: 14,
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
  confirmPaymentButton: {
    height: 55,
    backgroundColor: "#3629B7",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  confirmPaymentButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default styles;