import { View } from "react-native";
import HeaderWrapper from "@/components/headerWrapper";
import styles from "./ExchangeRate.styles";
import ExchangeRateSection from "@/components/exchangeRate";
import Container from "@/components/common/container";

const ExchangeRate = () => {
  // **** return jsx ****
  return (
    <Container withWrapper>
      <HeaderWrapper title="Exchange rate" />
      <View style={styles.content}>
        <ExchangeRateSection />
      </View>
    </Container>
  );
};

export default ExchangeRate;
