import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import TransferForm from "./_steps/Form";
import styles from "./Transfer.styles";
import HeaderWrapper from "@/components/headerWrapper";

const TransferScreen = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Transfer" />
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
              <TransferForm />
              {/* <ConfirmTransfer /> */}
              {/* <TransferSuccess /> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default TransferScreen;
