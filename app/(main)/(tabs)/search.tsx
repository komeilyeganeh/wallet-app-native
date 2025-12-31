import HeaderWrapper from "@/components/headerWrapper/HeaderWrapper";
import { Link } from "expo-router";
import { FC } from "react";
import { Image, Text, View } from "react-native";
import styles from "@/assets/styles/tabs/search.styles"
import Container from "@/components/common/container";

const SearchScreen: FC = () => {
  // **** jsx ****
  return (
    <Container withWrapper>
        <HeaderWrapper title="Search" />
        <View style={styles.linksContainer}>
          <Link href="/(main)/(tabs)/home">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Branch</Text>
                <Text style={styles.linkSubTitle}>Search for branch</Text>
              </View>
              <Image
                source={require("../../../assets/images/bank.webp")}
                style={{ width: 100, height: 78 }}
              />
            </View>
          </Link>
          <Link href="/(main)/(tabs)/home">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Interest rate</Text>
                <Text style={styles.linkSubTitle}>
                  Search for interest rate
                </Text>
              </View>
              <Image
                source={require("../../../assets/images/intereset-rate.webp")}
                style={{ width: 100, height: 78 }}
              />
            </View>
          </Link>
          <Link href="/(main)/(screens)/search/ExchangeRate">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Exchange rate</Text>
                <Text style={styles.linkSubTitle}>
                  Search for exchange rate
                </Text>
              </View>
              <Image
                source={require("../../../assets/images/exchange.webp")}
                style={{ width: 100, height: 78 }}
              />
            </View>
          </Link>
          <Link href="/(main)/(screens)/search/Exchange">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Exchange</Text>
                <Text style={styles.linkSubTitle}>
                  Exchange amount of money
                </Text>
              </View>
              <Image
                source={require("../../../assets/images/amount-money.webp")}
                style={{ width: 100, height: 78 }}
              />
            </View>
          </Link>
        </View>
    </Container>
  );
};

export default SearchScreen;
