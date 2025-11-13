import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AccountTab from "./_tabs/Account";
import styles from "./Wallets.styles";
import HeaderWrapper from "@/components/headerWrapper";
import WalletTab from "./_tabs/Wallet";

const WalletsScreen = () => {
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
              Wallet
            </Text>
          </TouchableOpacity>
        </View>
        {/* tabs render */}
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.content}>
              {activeTab === 1 && <AccountTab />}
              {activeTab === 2 && <WalletTab />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default WalletsScreen;
