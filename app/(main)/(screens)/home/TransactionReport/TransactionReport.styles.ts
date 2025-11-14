import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3629B7",
  },
  headerWrapper: {
    height: 110,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  carouselContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    minHeight: 280,
  },
  carousel: {
    margin: "auto"
  },
  transactionsScrollView: {
    flex: 1,
    marginTop: -80,
  },
  transactionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 20
  },
  daySection: {
    marginBottom: 20,
    marginTop: 40,
  },
  dayTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#CACACA",
    marginBottom: 12,
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  placeholderContainer: {
    alignItems: "center",
    padding: 50,
  },
  placeholderText: {
    marginTop: 15,
    color: "#CACACA",
    fontSize: 16,
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    marginTop: 15,
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
  // استایل‌های موجود قبلی
  cardContainer: {
    // در صورت نیاز
  },
  reportItems: {
    // در صورت نیاز
  },
});

export default styles;