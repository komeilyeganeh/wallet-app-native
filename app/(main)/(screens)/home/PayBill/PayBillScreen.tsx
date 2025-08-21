import HeaderWrapper from "@/components/headerWrapper/HeaderWrapper";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import styles from "./PayBill.styles";

const PayTheBillScreen = () => {
    // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Pay the bill" />
        <View style={styles.linksContainer}>
          <Link href="..">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Electric bill</Text>
                <Text style={styles.linkSubTitle}>
                  Pay electric bill this month
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/electric.png")}
              />
            </View>
          </Link>
          <Link href="..">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Water bill</Text>
                <Text style={styles.linkSubTitle}>
                  Pay water bill this month
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/water.png")}
              />
            </View>
          </Link>
          <Link href="..">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Mobile bill</Text>
                <Text style={styles.linkSubTitle}>
                  Pay mobile bill this month
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/mobile.png")}
              />
            </View>
          </Link>
          <Link href="..">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Internet bill</Text>
                <Text style={styles.linkSubTitle}>
                  Pay internet bill this month
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/internet.png")}
              />
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};



export default PayTheBillScreen;
