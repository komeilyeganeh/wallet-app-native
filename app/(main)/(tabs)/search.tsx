import HeaderWrapper from "@/components/headerWrapper/HeaderWrapper";
import { Link } from "expo-router";
import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const SearchScreen: FC = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Search"/>
        <View style={styles.linksContainer}>
          <Link href="/(main)/(tabs)/home">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Branch</Text>
                <Text style={styles.linkSubTitle}>Search for branch</Text>
              </View>
              <Image source={require("../../../assets/images/bank.png")} />
            </View>
          </Link>
          <Link href="/(main)/(tabs)/home">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Interest rate</Text>
                <Text style={styles.linkSubTitle}>Search for interest rate</Text>
              </View>
              <Image source={require("../../../assets/images/intereset-rate.png")} />
            </View>
          </Link>
          <Link href="/(main)/(tabs)/home">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Exchange rate</Text>
                <Text style={styles.linkSubTitle}>Search for exchange rate</Text>
              </View>
              <Image source={require("../../../assets/images/exchange.png")} />
            </View>
          </Link>
          <Link href="/(main)/(tabs)/home">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Exchange</Text>
                <Text style={styles.linkSubTitle}>Exchange amount of money</Text>
              </View>
              <Image source={require("../../../assets/images/amount-money.png")} />
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  linksContainer: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    rowGap: 28
  },
  linkItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  linkTitleWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: 6,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  linkSubTitle: {
    fontSize: 12,
    color: "#979797",
  },
});

export default SearchScreen;
