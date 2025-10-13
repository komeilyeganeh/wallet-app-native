import HeaderWrapper from "@/components/headerWrapper";
import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import styles from "./Exchange.styles";
import ExchangeForm from "@/components/exchangeForm/Exchange";

const Exchange = () => {
  const { width } = Dimensions.get("window");
  // **** return jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Exchange" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.content}>
              <Image
                source={require("../../../../../assets/images/exchange-rate.webp")}
                style={{ width: width - 40, height: 220 }}
                resizeMode="contain"
              />
              <ExchangeForm />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Exchange;
