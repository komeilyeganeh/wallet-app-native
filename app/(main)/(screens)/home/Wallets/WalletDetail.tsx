import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import HeaderWrapper from "@/components/headerWrapper";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import { useToast } from "react-native-toast-notifications";
import { MaterialIndicator } from "react-native-indicators";
import {
  useDeleteWallet,
  useGetWallet,
  useUpdateWallet,
} from "@/services/wallet/hooks";
import { useState, useEffect, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useGetCurrencies } from "@/services/currency/hooks";
import SelectBox from "@/components/input/selectBox";
import { useQueryClient } from "@tanstack/react-query";

const WalletDetail = () => {
  const queryClient = useQueryClient();
  const { walletId } = useLocalSearchParams();
  const {
    data: walletData,
    isPending,
    refetch: refetchWallet,
  } = useGetWallet(walletId as string);  

  const { data: currencies, isPending: currencyPending } = useGetCurrencies();
  const { mutate: mutateDeleteWallet } = useDeleteWallet(walletId as string);
  const { mutate: mutateUpdateWallet, isPending: isUpdating } = useUpdateWallet(
    walletId as string
  );
  const toast = useToast();
  const router = useRouter();

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    cardNumber: "",
    balance: "",
    accountHolderName: "",
    iban: "",
  });

  const [selectedCurrencyLabel, setSelectedCurrencyLabel] =
    useState<string>("");
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<number>(0);

  const currencyOptions =
    currencies?.data?.data?.map((currency: any) => ({
      key: currency.id.toString(),
      label: `${currency.name} (${currency.symbol})`,
    })) || [];

  useFocusEffect(
    useCallback(() => {
      refetchWallet();
      queryClient.invalidateQueries({
        queryKey: ["get_wallet", walletId],
        refetchType: "active"
      }); 
    }, [refetchWallet, queryClient, walletId])
  );

  // Load wallet data into form when data is fetched
  useEffect(() => {
    if (walletData?.data?.data) {
      const wallet = walletData.data.data;
      setFormData({
        bankName: wallet.bankName || "",
        cardNumber: wallet.cardNumber || "",
        balance: wallet.balance?.toString() || "",
        accountHolderName: wallet.accountHolderName || "",
        iban: wallet.iban || "",
      });

      if (wallet.currency) {
        setSelectedCurrencyLabel(
          `${wallet.currency.name} (${wallet.currency.symbol})`
        );
        setSelectedCurrencyId(wallet.currencyId);
      }
    }
  }, [walletData]);

  const handleDeleteCard = () => {
    mutateDeleteWallet(walletId as string, {
      onSuccess: () => {
        toast.show("Wallet deleted successfully", { type: "success" });
        router.back();
      },
      onError: (error) => {
        toast.show("Error deleting wallet", { type: "danger" });
        console.error("Delete error:", error);
      },
    });
  };

  const handleUpdateCard = () => {
    if (!walletData?.data?.data) {
      toast.show("Wallet data not found", { type: "danger" });
      return;
    }

    const wallet = walletData.data.data;
    const updateData = {
      id: wallet.id,
      userId: wallet.userId,
      currencyId: selectedCurrencyId || wallet.currencyId || 1,
      balance: formData.balance ? parseFloat(formData.balance) : wallet.balance,
      accountHolderName: formData.accountHolderName || wallet.accountHolderName,
      iban: formData.iban || wallet.iban,
      cardNumber: formData.cardNumber || wallet.cardNumber,
      bankName: formData.bankName || wallet.bankName,
    };

    const sanitizedData = Object.fromEntries(
      Object.entries(updateData).map(([key, value]) => [
        key,
        value === undefined ? "" : value,
      ])
    );

    mutateUpdateWallet(sanitizedData, {
      onSuccess: async () => {
        toast.show("Wallet updated successfully", { type: "success" });
        setIsUpdateModalVisible(false);
        queryClient.removeQueries({ queryKey: ["get_wallet"] });
        queryClient.invalidateQueries({ 
          queryKey: ["get_wallets"],
          refetchType: "all"
        });
        await refetchWallet();
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.show(`Error: ${errorMessage}`, { type: "danger" });
        console.error("Update error:", error.response?.data);
      },
    });
  };

  const wallet = walletData?.data?.data || {};
  const displayData = wallet
    ? {
        bankName: wallet.bankName || "Unknown Bank",
        cardNumber: wallet.cardNumber || "",
        balance:
          wallet.balance !== undefined
            ? `$${wallet.balance.toLocaleString()}`
            : "$0",
        accountHolderName: wallet.accountHolderName || "Unknown",
        currency: wallet.currency?.code || "USD",
        iban: wallet.iban || "Not available",
      }
    : {};

  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Wallet Details" />
        <View style={styles.content}>
          {isPending ? (
            <View style={styles.loadingContainer}>
              <MaterialIndicator size={25} color="#3629B7" />
              <Text style={styles.loadingText}>Loading wallet details...</Text>
            </View>
          ) : (
            <>
              <View style={styles.item}>
                <Text style={styles.itemKey}>Bank Name</Text>
                <Text style={styles.itemValue}>{displayData.bankName}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemKey}>Card Number</Text>
                <Text style={styles.itemValue}>
                  {cardNumberFormat(displayData.cardNumber)}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemKey}>Account Holder</Text>
                <Text style={styles.itemValue}>
                  {displayData.accountHolderName}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemKey}>Available Balance</Text>
                <Text style={styles.itemValue}>{displayData.balance}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemKey}>Currency</Text>
                <Text style={styles.itemValue}>{displayData.currency}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemKey}>IBAN</Text>
                <Text style={styles.itemValue}>{displayData.iban}</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={() => setIsUpdateModalVisible(true)}
            disabled={isPending}
          >
            <AntDesign name="edit" size={20} color="#FFF" />
            <Text style={styles.updateButtonText}>Update Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDeleteCard}
            disabled={isPending}
          >
            <AntDesign name="delete" size={20} color="#FF4267" />
            <Text style={styles.deleteButtonText}>
              {isPending ? (
                <MaterialIndicator size={20} color="#FF4267" />
              ) : (
                "Delete Wallet"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Update Modal */}
      <Modal
        visible={isUpdateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsUpdateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Wallet</Text>
              <TouchableOpacity onPress={() => setIsUpdateModalVisible(false)}>
                <AntDesign name="close" size={24} color="#343434" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Bank Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.bankName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, bankName: text })
                  }
                  placeholder="Enter bank name"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  value={formData.cardNumber}
                  onChangeText={(text) =>
                    setFormData({ ...formData, cardNumber: text })
                  }
                  placeholder="Enter card number"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Account Holder Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.accountHolderName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, accountHolderName: text })
                  }
                  placeholder="Enter account holder name"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Balance</Text>
                <TextInput
                  style={styles.input}
                  value={formData.balance}
                  onChangeText={(text) =>
                    setFormData({ ...formData, balance: text })
                  }
                  placeholder="Enter balance"
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Currency</Text>
                <SelectBox
                  data={currencyOptions}
                  onChange={(e: any) => {
                    setSelectedCurrencyLabel(e.label);
                    setSelectedCurrencyId(parseInt(e.key));
                  }}
                  label="Choose currency"
                  value={selectedCurrencyLabel}
                  disabled={currencyPending}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>IBAN</Text>
                <TextInput
                  style={styles.input}
                  value={formData.iban}
                  onChangeText={(text) =>
                    setFormData({ ...formData, iban: text })
                  }
                  placeholder="Enter IBAN"
                  autoCapitalize="characters"
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsUpdateModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleUpdateCard}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <MaterialIndicator size={20} color="#FFF" />
                ) : (
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
    display: "flex",
    rowGap: 16,
    marginTop: 16,
  },
  item: {
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
  itemKey: {
    fontSize: 16,
    color: "#989898",
  },
  itemValue: {
    fontSize: 16,
    color: "#281C9D",
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: "auto",
    marginBottom: 30,
    gap: 12,
  },
  button: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 10,
    gap: 8,
  },
  updateButton: {
    backgroundColor: "#3629B7",
  },
  updateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#FF4267",
    backgroundColor: "transparent",
  },
  deleteButtonText: {
    color: "#FF4267",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343434",
  },
  modalContent: {
    padding: 20,
    maxHeight: 400,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F9F9F9",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#3629B7",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WalletDetail;
