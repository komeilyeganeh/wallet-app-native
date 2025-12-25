import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3629B7",
  },
  headerWrapper: {
    height: 110,
    paddingTop: 8,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  contentWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  links: {
    display: "flex",
    rowGap: 16,
    transform: "translateY(-32px)",
  },
  linkItem: {
    width: "100%",
    height: 43,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
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
    flex: 1,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  sheetBody: {
    padding: 20,
  },
  sheetDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    lineHeight: 20,
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
  sheetActions: {
    marginTop: 20,
    marginBottom: 40,
  },
});
export default styles;
