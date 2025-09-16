import { lazy } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import styles from "./TransactionReport.styles";

const ReportChart = lazy(() => import("@/components/charts/ReportChart"))
const CreditCard = lazy(() => import("@/components/creditCard/CreditCard"))
const ReportCard = lazy(() => import("@/components/reportCard/ReportCard"))

const TransactionReportScreen = () => {
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
          <CreditCard  name="Komeil"
              accountLevel="Amazon Platinium"
              cardNumber="6164 **** **** 0022"
              accountBalance="9.200"
              theme="yellow"/>
        </View>
        <ScrollView style={{paddingTop: 15, marginTop: -90}}>
          <View
            style={{ paddingHorizontal: 20, paddingBottom: 50 }}
          >
            <View style={styles.chart}>
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
            </View>
            <View style={styles.reportItems}>
              <Text style={styles.day}>Today</Text>
              <ReportCard
                icon={<Ionicons name="water" size={24} color="white" />}
                color="#3629B7"
                title="Water Bill"
                description="Unsuccessfully"
                amount={-280}
              />
              <Text style={styles.day}>Yesterday</Text>
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
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TransactionReportScreen;
