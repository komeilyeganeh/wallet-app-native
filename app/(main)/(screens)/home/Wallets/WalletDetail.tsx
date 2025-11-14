import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderWrapper from "@/components/headerWrapper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import { useToast } from "react-native-toast-notifications";
import { MaterialIndicator } from "react-native-indicators";
import { useDeleteWallet, useGetWallet } from "@/services/wallet/hooks";

const WalletDetail = () => {
  const { walletId } = useLocalSearchParams();
  const { data: walletData, isPending } = useGetWallet(walletId as string);
  const { mutate: mutateDeleteWallet } = useDeleteWallet(walletId as string);
  const toast = useToast();
  const router = useRouter();
  
  const handleDeleteCard = () => {
    mutateDeleteWallet(walletId as string, {
      onSuccess: () => {
        toast.show("Wallet deleted successfully", { type: "success" });
        router.back();
      },
      onError: (error) => {
        toast.show("Error deleting wallet", { type: "danger" });
        console.error("Delete error:", error);
      }
    });
  };

  const wallet = walletData?.data?.data || {};
  const displayData = {
    bankName: wallet?.bankName || "Unknown Bank",
    cardNumber: wallet?.cardNumber|| "",
    balance: wallet?.balance ? `$${wallet.balance.toLocaleString()}` : "$0",
    accountHolderName: wallet?.accountHolderName || "Unknown",
    currency: wallet?.currency?.code || "USD",
    iban: wallet?.iban || "Not available",
  };

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
                  {cardNumberFormat(displayData.cardNumber as string)}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemKey}>Account Holder</Text>
                <Text style={styles.itemValue}>{displayData.accountHolderName}</Text>
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
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteCard}
          disabled={isPending}
        >
          <Text style={{ color: "#FF4267", fontSize: 16, textAlign: "center" }}>
            {isPending ? <MaterialIndicator size={20} color="#FF4267" /> : "Delete Wallet"}
          </Text>
        </TouchableOpacity>
      </View>
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
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343434",
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
  deleteButton: {
    height: 44,
    marginTop: "auto",
    marginBottom: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF4267",
    borderRadius: 8,
    padding: 10,
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
});

export default WalletDetail;