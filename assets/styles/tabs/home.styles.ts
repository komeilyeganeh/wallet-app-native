import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 6,
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
