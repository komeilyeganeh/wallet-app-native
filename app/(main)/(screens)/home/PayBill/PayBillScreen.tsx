import { lazy } from "react";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import styles from "./PayBill.styles";

const HeaderWrapper = lazy(() => import("@/components/headerWrapper/HeaderWrapper"))

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
                source={require("../../../../../assets/images/electric.webp")}
                style={{ width: 90, height: 81 }}
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
                source={require("../../../../../assets/images/water.webp")}
                style={{ width: 90, height: 81 }}
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
                source={require("../../../../../assets/images/mobile.webp")}
                style={{ width: 90, height: 81 }}
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
