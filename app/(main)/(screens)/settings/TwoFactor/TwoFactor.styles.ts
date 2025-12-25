import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#666",
    fontSize: 16,
  },
  statusCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  statusEnabled: {
    backgroundColor: "#D4EDDA",
  },
  statusDisabled: {
    backgroundColor: "#F8D7DA",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  statusDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  actionsContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#3629B7",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#6C757D",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: "#DC3545",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  dangerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  helperText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
  infoSection: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3629B7",
    color: "#FFF",
    textAlign: "center",
    lineHeight: 28,
    marginRight: 12,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    lineHeight: 20,
  },
});
export default styles;
