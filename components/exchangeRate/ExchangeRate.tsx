import { FC } from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "./ExchangeRate.styles";

const data = [
  { key: "USD", label: "100.25" },
  { key: "AED", label: "09.02" },
  { key: "ALL", label: "19.24" },
  { key: "ARS", label: "22.04" },
];

const ExchangeRate: FC = () => {
  // **** return jsx ****
  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerList}>
          <Text style={styles.headerText}>Currency</Text>
          <Text style={styles.headerText}>Rate</Text>
        </View>
        {data?.map((curr: any) => (
          <View key={curr.key} style={styles.currencyRateItem}>
            <Text style={styles.currencyRateTitle}>{curr?.key}</Text>
            <Text style={styles.currencyRateValue}>{curr?.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ExchangeRate;
