import SelectBox from "@/components/input/selectBox";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./InternetBill.styles"
import { useState } from "react";

const data = [
  { key: "190089885456", label: "1900 8988 5456" },
  { key: "190081125222", label: "1900 8112 5222" },
  { key: "441100001234", label: "4411 0000 1234" },
  { key: "190089885400", label: "1900 8988 5456" },
  { key: "190089885450", label: "1900 8988 5450" },
];

const InternetBillPay = () => {
     const [selectedItem, setSelectedItem] = useState(null);
  // **** return jsx ****
  return (
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
        <TouchableOpacity style={[styles.button, { width: 100, marginTop: 0 }]}>
          <Text style={styles.buttonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default InternetBillPay;