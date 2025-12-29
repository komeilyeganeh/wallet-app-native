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
    justifyContent: "space-between",
    paddingBottom: 14,
    rowGap: 25,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
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
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
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
    height: 55,
    borderRadius: 12,
    backgroundColor: "#3629B7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },

  operatorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  operatorItem: {
    flex: 1,
    minWidth: 100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fafafaff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  operatorText: {
    fontSize: 13,
    color: "#999",
    fontWeight: "500",
  },
  amountContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  amountItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fafafaff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    minWidth: 100,
  },
  amountValue: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
    textAlign: "center",
  },

  itemSelected: {
    backgroundColor: "#3629B7",
    borderColor: "#3629B7",
  },
  valueSelected: {
    color: "#FFF",
  },

  rechargeInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rechargeInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  rechargeInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rechargeInfoLabel: {
    fontSize: 14,
    color: "#666",
  },
  rechargeInfoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  payButton: {
    height: 50,
    backgroundColor: "#34C759",
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
