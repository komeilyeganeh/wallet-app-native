import { View } from "react-native";
import HeaderWrapper from "@/components/headerWrapper";
import styles from "./ExchangeRate.styles";
import ExchangeRateSection from "@/components/exchangeRate"

const ExchangeRate = () => {
  // **** return jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Exchange rate" />
        <View style={styles.content}>
          <ExchangeRateSection />
        </View>
      </View>
    </View>
  );
};

export default ExchangeRate;
