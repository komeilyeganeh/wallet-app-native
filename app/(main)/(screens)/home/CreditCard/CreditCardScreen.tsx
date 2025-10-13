import { lazy, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import CreditCardSuccess from "./_step/success";
import styles from "./CreditCard.styles";
import { useKeyboard } from "@react-native-community/hooks";

const CreditCard = lazy(() => import("@/components/creditCard/CreditCard"));
const SelectBox = lazy(() => import("@/components/input/selectBox/SelectBox"));
const ReportCard = lazy(() => import("@/components/reportCard/ReportCard"));

const data = [
  { key: "190089885456", label: "1900 8988 5456" },
  { key: "190081125222", label: "1900 8112 5222" },
  { key: "441100001234", label: "4411 0000 1234" },
  { key: "190089885400", label: "1900 8988 5456" },
  { key: "190089885450", label: "1900 8988 5450" },
];

const CreditCardScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const keyboard = useKeyboard();
  // **** jsx ****
  return (
    <>
      {/* <CreditCardSuccess /> */}
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Link href="..">
            <AntDesign name="left" color="#FFF" size={20} />
          </Link>
          <Text style={styles.headerTitle}>Credit card</Text>
        </View>
        <KeyboardAvoidingView
        style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.contentWrapper}>
              <CreditCard
                name="Komeil"
                accountLevel="Amazon Platinium"
                cardNumber="6164 **** **** 0022"
                accountBalance="9.200"
                theme="yellow"
                bankName="Sepah"
              />
              <View style={{ marginTop: 32, gap: 12 }}>
                <ReportCard
                  icon={<AntDesign name="camera" size={24} color="white" />}
                  title="Buy Camera"
                  amount={-1200}
                  color="#3629B7"
                  description="02/11/2019"
                />
                <ReportCard
                  icon={<FontAwesome name="tv" size={24} color="white" />}
                  title="Buy Television"
                  amount={-800}
                  color="#FF4267"
                  description="02/11/2018"
                />
                <ReportCard
                  icon={<AntDesign name="camera" size={24} color="white" />}
                  title="Buy Camera"
                  amount={-1200}
                  color="#3629B7"
                  description="02/11/2019"
                />
                <ReportCard
                  icon={<FontAwesome name="tv" size={24} color="white" />}
                  title="Buy Television"
                  amount={-800}
                  color="#FF4267"
                  description="02/11/2018"
                />
              </View>
              <View style={styles.total}>
                <Text style={styles.totalTitle}>total</Text>
                <Text style={styles.totalAmount}>-$3100</Text>
              </View>
              <View style={styles.form}>
                <SelectBox
                  data={data}
                  onChange={(e) => {
                    setSelectedItem(e.label);
                  }}
                  label="Choose account/ card"
                  value={selectedItem}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    gap: 12,
                  }}
                >
                  <TextInput
                    placeholder="OTP"
                    placeholderTextColor="#CACACA"
                    secureTextEntry
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={[styles.button, { width: 100, marginTop: 0 }]}
                  >
                    <Text style={styles.buttonText}>Get OTP</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default CreditCardScreen;
