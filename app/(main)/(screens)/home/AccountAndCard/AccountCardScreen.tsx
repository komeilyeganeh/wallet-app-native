import { lazy, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AccountTab from "./_tabs/Account";
import CardTab from "./_tabs/Card";
import styles from "./AccountCard.styles";

const HeaderWrapper = lazy(() => import("@/components/headerWrapper/HeaderWrapper"))

const AccountCardScreen = () => {
  const [activeTab, setActiveTab] = useState(1);
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Account and card" />
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 1 && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(1)}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 1 && styles.tabButtonTextActive,
              ]}
            >
              Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 2 && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(2)}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 2 && styles.tabButtonTextActive,
              ]}
            >
              Card
            </Text>
          </TouchableOpacity>
        </View>
        {/* tabs render */}
        <View style={styles.content}>
          {activeTab === 1 && <AccountTab />}
          {activeTab === 2 && <CardTab />}
        </View>
      </View>
    </View>
  );
};

export default AccountCardScreen;
