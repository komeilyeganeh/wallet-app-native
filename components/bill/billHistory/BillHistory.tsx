import { useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RechargeDetailModal from "./BillDetailMode";
import { useGetBillPayments } from "@/services/bill/hooks";
import styles from "./BillHistory.styles";

const BillPaymentsHistory = () => {
  const { data: billHistoryData, refetch, isPending } = useGetBillPayments();

  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const hasNextPage = billHistoryData?.data?.hasNextPage || false;
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

  const handleItemPress = (billId: number) => {
    setSelectedBillId(billId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBillId(null);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No bill payments history</Text>
      <Text style={styles.emptySubtitle}>
        You haven't made any bill payments yet
      </Text>
    </View>
  );

  const renderBillItem = ({ item }: { item: any }) => {
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
        data={billHistoryData?.data?.data}
        renderItem={renderBillItem}
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
        rechargeId={selectedBillId!}
      />
    </View>
  );
};

export default BillPaymentsHistory;
