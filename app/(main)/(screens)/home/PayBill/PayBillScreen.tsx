import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import styles from "./PayBill.styles";
import HeaderWrapper from "@/components/headerWrapper";
import { FontAwesome5 } from "@expo/vector-icons";

const PayTheBillScreen = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper
          title="Pay the bill"
          icon={
            <Link href="/(main)/(screens)/home/PayBill/history/BillHistoryScreen">
              <FontAwesome5 name="history" size={22} color="black" />
            </Link>
          }
        />
        <View style={styles.linksContainer}>
          <Link href="/(main)/(screens)/home/PayBill/ElectricBill/ElectricBill">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Electric bill</Text>
                <Text style={styles.linkSubTitle}>
                  Pay electric bill this month
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/electric.webp")}
                style={{ width: 90, height: 81 }}
              />
            </View>
          </Link>
          <Link href="/(main)/(screens)/home/PayBill/WaterBill/WaterBill">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Water bill</Text>
                <Text style={styles.linkSubTitle}>
                  Pay water bill this month
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/water.webp")}
                style={{ width: 90, height: 81 }}
              />
            </View>
          </Link>
          <Link href="/(main)/(screens)/home/PayBill/MobileBill/MobileBill">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Mobile bill</Text>
                <Text style={styles.linkSubTitle}>
                  Pay mobile bill this month
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/mobile.webp")}
                style={{ width: 90, height: 81 }}
              />
            </View>
          </Link>
          <Link href="/(main)/(screens)/home/PayBill/InternetBill/InternetBill">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Internet bill</Text>
                <Text style={styles.linkSubTitle}>
                  Pay internet bill this month
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/internet.webp")}
                style={{ width: 90, height: 81 }}
              />
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default PayTheBillScreen;
