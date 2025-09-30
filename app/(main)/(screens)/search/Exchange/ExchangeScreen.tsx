import HeaderWrapper from "@/components/headerWrapper";
import { Dimensions, Image, View } from "react-native";
import styles from "./Exchange.styles";
import ExchangeForm from "@/components/exchangeForm/Exchange";


const Exchange = () => {
  const { width } = Dimensions.get("window");
  // **** return jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Exchange" />
        <View style={styles.content}>
          <Image
            source={require("../../../../../assets/images/exchange-rate.webp")}
            style={{ width: width - 40, height: 220 }}
            resizeMode="contain"
          />
          <ExchangeForm />
        </View>
      </View>
    </View>
  );
};

export default Exchange;
