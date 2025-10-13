import { Text, View } from "react-native";
import styles from "./Account.styles";
import Profile from "@/components/profile";

const AccountTab = () => {
  // **** jsx ****
  return (
    <View style={styles.accountTab}>
      <Profile />
      <View style={styles.accountInfo}>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountTitle}>Account 1</Text>
          <Text style={styles.accountTitle}>1900 8988 1234</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountSubTitle}>Avalable balance</Text>
          <Text style={styles.accountValue}>$20,000</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountSubTitle}>Branch</Text>
          <Text style={styles.accountValue}>New York</Text>
        </View>
      </View>
      <View style={styles.accountInfo}>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountTitle}>Account 2</Text>
          <Text style={styles.accountTitle}>8988 1234</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountSubTitle}>Avalable balance</Text>
          <Text style={styles.accountValue}>$90,000</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountSubTitle}>Branch</Text>
          <Text style={styles.accountValue}>New York</Text>
        </View>
      </View>
      <View style={styles.accountInfo}>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountTitle}>Account 3</Text>
          <Text style={styles.accountTitle}>1900 1234 2222</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountSubTitle}>Avalable balance</Text>
          <Text style={styles.accountValue}>$130,200</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountSubTitle}>Branch</Text>
          <Text style={styles.accountValue}>New York</Text>
        </View>
      </View>
    </View>
  );
};

export default AccountTab;
