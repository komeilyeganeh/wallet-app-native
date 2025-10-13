import { Text, View } from "react-native";
import styles from "./AccountManagement.styles";
import HeaderWrapper from "@/components/headerWrapper";

const AccountManagementScreen = () => {
    // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Management" />
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.title}>Account</Text>
              <Text style={styles.title}>1900 8988 5456</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.contentTitle}>From</Text>
              <Text style={styles.contentValue}>02/11/2019</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.contentTitle}>To</Text>
              <Text style={styles.contentValue}>02/11/2020</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.contentTitle}>Time deposit</Text>
              <Text style={styles.contentValue}>12 months</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.contentTitle}>Interest rate</Text>
              <Text style={styles.contentValue}>5%</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.title}>Account</Text>
              <Text style={styles.title}>1900 8988 5456</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.contentTitle}>From</Text>
              <Text style={styles.contentValue}>02/11/2019</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.contentTitle}>To</Text>
              <Text style={styles.contentValue}>02/11/2020</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.contentTitle}>Time deposit</Text>
              <Text style={styles.contentValue}>12 months</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.contentTitle}>Interest rate</Text>
              <Text style={styles.contentValue}>5%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountManagementScreen;
