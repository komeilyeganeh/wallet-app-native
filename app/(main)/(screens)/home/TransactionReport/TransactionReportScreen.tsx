import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import styles from "./TransactionReport.styles";
import { useGetTransactions } from "./api/useTransactions";
import { TransactionType } from "@/types/transactions";
import { SkypeIndicator } from "react-native-indicators";
import CreditCard from "@/components/creditCard";
import ReportCard from "@/components/reportCard";

const transactionTitle = [
  "Undefinde",
  "Transfer",
  "Deposit",
  "Withdrawal",
  "Payment",
  "Refund",
  "Fee",
  "Adjustment",
];

const TransactionReportScreen = () => {
  const { data: transactions, isPending } = useGetTransactions();
  
  
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerContent}>
          <Link href="..">
            <AntDesign name="left" color="#FFF" size={20} />
          </Link>
          <Text style={styles.headerTitle}>Transaction report</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <CreditCard
            name="Komeil"
            accountLevel="Amazon Platinium"
            cardNumber="6164 **** **** 0022"
            accountBalance="9.200"
            theme="yellow"
            bankName="Sepah"
          />
        </View>
        <ScrollView style={{ paddingTop: 15, marginTop: -90 }}>
          <View style={{ paddingHorizontal: 20, paddingBottom: 50 }}>
            {/* <View style={styles.chart}>
              <Text
                style={{ color: "#343434", fontSize: 12, fontWeight: "bold" }}
              >
                Balance
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text
                  style={{ fontSize: 32, color: "#3629B7", fontWeight: "bold" }}
                >
                  1000
                </Text>
                <Text
                  style={{ color: "#979797", fontSize: 12, fontWeight: "bold" }}
                >
                  USD
                </Text>
              </View>
              <ReportChart />
            </View> */}
            <View style={styles.reportItems}>
              {/* <Text style={styles.day}>Today</Text> */}
              {isPending ? (
                <SkypeIndicator color="#0000ff" size={40} />
              ) : (
                transactions?.data?.data?.map(
                  (transaction: TransactionType) => (
                    <ReportCard
                    key={transaction.id}
                      icon={
                        <FontAwesome6
                          name="money-bill-transfer"
                          size={24}
                          color="#fff"
                        />
                      }
                      color="#3629B7"
                      title={transactionTitle[transaction.type]}
                      description="Successfully"
                      amount={transaction?.amount}
                    />
                  )
                )
              )}

              {/* <Text style={styles.day}>Yesterday</Text>
              <ReportCard
                icon={<Ionicons name="water" size={24} color="white" />}
                color="#FF4267"
                title="Income: Salary Oct"
                description="Unsuccessfully"
                amount={1200}
              />
              <ReportCard
                icon={<Ionicons name="water" size={24} color="white" />}
                color="#FFAF2A"
                title="Income : Jane transfers"
                description="Unsuccessfully"
                amount={500}
              />
              <ReportCard
                icon={<Ionicons name="water" size={24} color="white" />}
                color="#52D5BA"
                title="Internet Bill"
                description="Unsuccessfully"
                amount={-190}
              /> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TransactionReportScreen;
