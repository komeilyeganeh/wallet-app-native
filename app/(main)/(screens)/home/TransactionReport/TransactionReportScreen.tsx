import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState, useRef } from "react";
import styles from "./TransactionReport.styles";
import { useGetTransactions } from "@/services/transaction/hooks";
import { TransactionType } from "@/types/transactions";
import { SkypeIndicator } from "react-native-indicators";
import CreditCard from "@/components/creditCard";
import ReportCard from "@/components/reportCard";
import Carousel from "react-native-reanimated-carousel";
import { useGetMyWallets } from "@/services/wallet/hooks";
import { useUserData } from "@/hooks/useUserData";
import { cardNumberFormat } from "@/lib/cardNumberFormat";

const { width: screenWidth } = Dimensions.get("window");

const transactionTitle = [
  "Undefined",
  "Transfer",
  "Deposit",
  "Withdrawal",
  "Payment",
  "Refund",
  "Fee",
  "Adjustment",
];

const TransactionReportScreen = () => {
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const carouselRef = useRef<any>(null);

  const { userId } = useUserData();
  const { data: walletsData, isPending: walletsPending } =
    useGetMyWallets(userId);
  const { data: transactions, isPending: transactionsPending } =
    useGetTransactions(selectedWalletId || undefined);

  const wallets = walletsData?.data?.data || [];

  const renderWalletItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = selectedWalletId === item.id;

    return (
      <TouchableOpacity
        onPress={() => setSelectedWalletId(item.id)}
        activeOpacity={0.8}
      >
        <CreditCard
          name={item?.accountHolderName || "User"}
          accountLevel="Wallet"
          cardNumber={cardNumberFormat(item?.cardNumber || item?.id)}
          accountBalance={item?.balance ? `${item.balance}` : "$0"}
          theme={index % 2 !== 0 ? "yellow" : "blue"}
          bankName={item?.bankName || "Bank"}
          isSelected={isSelected}
        />
      </TouchableOpacity>
    );
  };

  const groupTransactionsByDate = (transactionsList: TransactionType[]) => {
    const grouped: { [key: string]: TransactionType[] } = {};

    transactionsList?.forEach((transaction) => {
      const date = new Date(transaction.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });

    return grouped;
  };

  const groupedTransactions = groupTransactionsByDate(
    transactions?.data?.data || []
  );
  const isPending = walletsPending || transactionsPending;

  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerContent}>
          <Link href="..">
            <AntDesign name="left" color="#FFF" size={20} />
          </Link>
          <Text style={styles.headerTitle}>Transaction Report</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.carouselContainer}>
          {walletsPending ? (
            <View style={styles.loadingContainer}>
              <SkypeIndicator color="#3629B7" size={30} />
              <Text style={styles.loadingText}>Loading wallets...</Text>
            </View>
          ) : wallets.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No wallets found</Text>
            </View>
          ) : wallets.length === 1 ? (
            <View style={{ width: screenWidth * 0.88, margin: "auto" }}>
              {renderWalletItem({ item: wallets[0], index: 0 })}
            </View>
          ) : (
            <Carousel
              ref={carouselRef}
              loop={false}
              width={screenWidth * 0.88}
              height={250}
              autoPlay={false}
              data={wallets}
              scrollAnimationDuration={500}
              renderItem={renderWalletItem}
              mode="vertical-stack"
              style={styles.carousel}
            />
          )}
        </View>

        <ScrollView style={styles.transactionsScrollView}>
          <View style={styles.transactionsContainer}>
            {!selectedWalletId ? (
              <View style={styles.placeholderContainer}>
                <FontAwesome6 name="wallet" size={50} color="#CACACA" />
                <Text style={styles.placeholderText}>
                  Select a wallet to view transactions
                </Text>
              </View>
            ) : transactionsPending ? (
              <View style={styles.loadingContainer}>
                <SkypeIndicator color="#3629B7" size={40} />
                <Text style={styles.loadingText}>Loading transactions...</Text>
              </View>
            ) : Object.keys(groupedTransactions).length === 0 ? (
              <View style={styles.emptyContainer}>
                <FontAwesome6 name="receipt" size={50} color="#CACACA" />
                <Text style={styles.emptyText}>
                  No transactions found for this wallet
                </Text>
              </View>
            ) : (
              Object.entries(groupedTransactions).map(
                ([date, dayTransactions]) => (
                  <View key={date} style={styles.daySection}>
                    <Text style={styles.dayTitle}>{date}</Text>
                    {dayTransactions.map((transaction: TransactionType) => (
                      <ReportCard
                        key={transaction.id}
                        icon={
                          <FontAwesome6
                            name="money-bill-transfer"
                            size={24}
                            color="#fff"
                          />
                        }
                        color={getTransactionColor(transaction.type)}
                        title={
                          transactionTitle[transaction.type - 1] || "Unknown"
                        }
                        description={getStatusText(transaction.status)}
                        amount={transaction.amount}
                        currency={transaction.currencyCode}
                        isSuccess={transaction.status === 1}
                      />
                    ))}
                  </View>
                )
              )
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const getTransactionColor = (type: number): string => {
  const colors = {
    1: "#3629B7", // Transfer - Blue
    2: "#52D5BA", // Deposit - Green
    3: "#FF4267", // Withdrawal - Red
    4: "#FFAF2A", // Payment - Orange
    5: "#0890FE", // Refund - Light Blue
    6: "#5655B9", // Fee - Purple
    7: "#FB6B18", // Adjustment - Dark Orange
  };

  return colors[type as keyof typeof colors] || "#3629B7";
};

const getStatusText = (status: number): string => {
  const statusText = {
    1: "Successfully",
    2: "Pending",
    3: "Failed",
    4: "Cancelled",
  };

  return statusText[status as keyof typeof statusText] || "Unknown";
};

export default TransactionReportScreen;
