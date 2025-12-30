import { useGetMyRecharges } from "@/services/recharge/hooks";
import { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RechargeDetailModal from "./RechargeDetailMode";

const RechargesHistory = () => {
  const {
    data: rechargesHistoryData,
    refetch,
    isPending,
  } = useGetMyRecharges();
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRechargeId, setSelectedRechargeId] = useState<number | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const hasNextPage = rechargesHistoryData?.data?.hasNextPage || false;
  const isLoadingMore = isPending && pageNumber > 1;

  const handleRefresh = async () => {
    setRefreshing(true);
    setPageNumber(1);
    await refetch();
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isLoadingMore) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 1:
        return { icon: "✅", color: "#34C759", label: "Successful" };
      case 0:
        return { icon: "❌", color: "#FF3B30", label: "Failed" };
      default:
        return { icon: "❓", color: "#8E8E93", label: "Unknown" };
    }
  };

  const getOperatorName = (operator: string) => {
    switch (operator) {
      case "MCI":
        return "Hamrah Aval";
      case "MTN":
        return "Irancell";
      case "Rightel":
        return "Rightel";
      default:
        return operator;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No recharge history</Text>
      <Text style={styles.emptySubtitle}>
        You haven't made any recharges yet
      </Text>
    </View>
  );

  const handleItemPress = (rechargeId: number) => {
    setSelectedRechargeId(rechargeId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRechargeId(null);
  };

  const renderRechargeItem = ({ item }: { item: any }) => {
    const statusInfo = getStatusIcon(item.status);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleItemPress(item.id)}
      >
        <View style={styles.itemHeader}>
          <View style={styles.operatorInfo}>
            <View
              style={[
                styles.operatorBadge,
                { backgroundColor: statusInfo.color + "20" },
              ]}
            >
              <Text
                style={[styles.operatorBadgeText, { color: statusInfo.color }]}
              >
                {getOperatorName(item.operator)}
              </Text>
            </View>
            <Text style={styles.statusText}>{statusInfo.icon}</Text>
          </View>
          <Text style={styles.amountText}>
            {item.amount.toLocaleString()} {item?.currencyCode}
          </Text>
        </View>

        <View style={styles.itemBody}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{item.phoneNumber}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>
              {formatDate(item.rechargeDate)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={rechargesHistoryData?.data?.data}
        renderItem={renderRechargeItem}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#3629B7"]}
            tintColor="#3629B7"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmptyList}
      />

      <RechargeDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        rechargeId={selectedRechargeId!}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#F2F1F9",
    borderRadius: 20,
  },
  filterButtonText: {
    fontSize: 14,
    color: "#3629B7",
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  operatorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  operatorBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  operatorBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusText: {
    fontSize: 13,
    color: "#666",
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3629B7",
  },
  itemBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 13,
    color: "#8E8E93",
    flex: 1,
  },
  infoValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    flex: 2,
    textAlign: "left",
  },
  transactionId: {
    fontSize: 12,
    color: "#8E8E93",
    fontFamily: "monospace",
    flex: 2,
    textAlign: "left",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF3B30",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#3629B7",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
});

export default RechargesHistory;
