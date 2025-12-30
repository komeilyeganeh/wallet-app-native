// components/recharge/RechargeDetailModal.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import { useGetRechargeById } from "@/services/recharge/hooks";

type RechargeDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  rechargeId: number;
};

const RechargeDetailModal: React.FC<RechargeDetailModalProps> = ({
  visible,
  onClose,
  rechargeId,
}) => {
  const {
    data: rechargeDetail,
    isPending,
    error,
    refetch,
  } = useGetRechargeById(rechargeId);
  
  const getStatusInfo = (status: number) => {
    switch (status) {
      case 1:
        return { text: "Successful", color: "#34C759", bgColor: "#c4ffc7ff" };
      case 0:
        return { text: "Failed", color: "#FF3B30", bgColor: "#FFEBE9" };
      default:
        return { text: "Unknown", color: "#8E8E93", bgColor: "#F2F2F7" };
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
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    if (visible && rechargeId) {
      refetch();
    }
  }, [visible, rechargeId]);

  if (!visible || !rechargeId) return null;

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <MaterialIndicator size={40} color="#3629B7" />
      <Text style={styles.loadingText}>Loading details...</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Error loading details</Text>
      <Text style={styles.errorMessage}>
        {error?.message || "Unable to load recharge details"}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Recharge Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {isPending ? (
              renderLoading()
            ) : error ? (
              renderError()
            ) : rechargeDetail?.data?.data ? (
              <View style={styles.detailsContainer}>
                {/* Status Badge */}
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: getStatusInfo(
                          rechargeDetail.data?.data.status
                        ).bgColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: getStatusInfo(rechargeDetail.data.status)
                            .color,
                        },
                      ]}
                    >
                      {getStatusInfo(rechargeDetail.data?.data.status).text}
                    </Text>
                  </View>
                </View>

                {/* Amount Section */}
                <View style={styles.amountSection}>
                  <Text style={styles.amountLabel}>Amount</Text>
                  <Text style={styles.amountValue}>
                    {rechargeDetail.data?.data.amount?.toLocaleString()}{" "}
                    {rechargeDetail.data?.data.currencyCode}
                  </Text>
                </View>

                {/* Details Grid */}
                <View style={styles.detailsGrid}>
                  <DetailRow
                    label="Transaction ID"
                    value={rechargeDetail.data?.data.transactionId}
                  />
                  <DetailRow
                    label="Operator"
                    value={getOperatorName(rechargeDetail.data?.data.operator)}
                  />
                  <DetailRow
                    label="Phone Number"
                    value={rechargeDetail.data?.data.phoneNumber}
                  />
                  <DetailRow
                    label="Recharge Date"
                    value={formatDate(rechargeDetail.data?.data.rechargeDate)}
                  />

                  {rechargeDetail.data.description && (
                    <DetailRow
                      label="Description"
                      value={rechargeDetail.data.description}
                    />
                  )}

                  {rechargeDetail.data.errorMessage && (
                    <DetailRow
                      label="Error Message"
                      value={rechargeDetail.data.errorMessage}
                      isError={true}
                    />
                  )}

                  {rechargeDetail.data.walletId && (
                    <DetailRow
                      label="Wallet ID"
                      value={rechargeDetail.data.walletId.toString()}
                    />
                  )}

                  {rechargeDetail.data.referenceId && (
                    <DetailRow
                      label="Reference ID"
                      value={rechargeDetail.data.referenceId}
                    />
                  )}
                </View>

                {/* Footer Info */}
                <View style={styles.footerInfo}>
                  <Text style={styles.footerText}>
                    If you have any issues with this transaction, please contact
                    support.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No details found</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const DetailRow: React.FC<{
  label: string;
  value: string;
  isError?: boolean;
}> = ({ label, value, isError = false }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text
      style={[styles.detailValue, isError && styles.errorValue]}
      numberOfLines={2}
    >
      {value || "N/A"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    minHeight: "40%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
    fontWeight: "300",
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    paddingVertical: 40,
    alignItems: "center",
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
  detailsContainer: {
    paddingVertical: 20,
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  amountSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3629B7",
  },
  detailsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  detailLabel: {
    fontSize: 14,
    color: "#8E8E93",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 2,
    textAlign: "left",
  },
  errorValue: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  footerInfo: {
    backgroundColor: "#F8F9FF",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  footerText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#8E8E93",
  },
});

export default RechargeDetailModal;
