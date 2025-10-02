import { FC, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./InfoBill.styles";
import InternetBillPay from "@/app/(main)/(screens)/home/PayBill/InternetBill/InternetBillPay";

const InfoBill: FC = () => {
  const { width } = Dimensions.get("window");
  const [isShowPayForm, setIsShowPayForm] = useState(false);
  // **** return jsx ****
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -30 }}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/withdraw.webp")}
          style={{ width: width - 40, height: 220 }}
          resizeMode="contain"
        />
        <Text style={styles.dateText}>01/10/2019 - 01/11/2019</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.infoTitle}>All the Bills</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemKey}>Name</Text>
            <Text style={styles.infoItemValue}>Jackson Maine</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemKey}>Address</Text>
            <Text style={styles.infoItemValue}>
              403 East 4th Street, Santa Ana
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemKey}>Phone number</Text>
            <Text style={styles.infoItemValue}>+8424599721</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemKey}>Code</Text>
            <Text style={styles.infoItemValue}>#2343543</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemKey}>From</Text>
            <Text style={styles.infoItemValue}>01/10/2019</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemKey}>To</Text>
            <Text style={styles.infoItemValue}>01/11/2019</Text>
          </View>
          <View
            style={[
              styles.infoItem,
              {
                borderBottomWidth: 1,
                borderColor: "#CBCBCB",
                borderStyle: "dashed",
                paddingBottom: 15,
              },
            ]}
          >
            <Text style={styles.infoItemAmountKey}>Internet fee</Text>
            <Text style={styles.infoItemAmountValue}>$50</Text>
          </View>
          <View
            style={[
              styles.infoItem,
              {
                borderBottomWidth: 1,
                borderColor: "#CBCBCB",
                borderStyle: "dashed",
                paddingBottom: 15,
              },
            ]}
          >
            <Text style={styles.infoItemAmountKey}>Tax</Text>
            <Text style={styles.infoItemAmountValue}>$10</Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={{
                fontSize: 17,
                color: "#343434",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Total
            </Text>
            <Text
              style={{ fontSize: 24, color: "#FF4267", fontWeight: "bold" }}
            >
              $60
            </Text>
          </View>
          {isShowPayForm && <InternetBillPay />}
          <TouchableOpacity
            style={{
              height: 44,
              backgroundColor: "#3629B7",
              borderRadius: 15,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
              marginBottom: 25
            }}
            onPress={() => setIsShowPayForm(true)}
          >
            <Text style={{ color: "#FFF" }}>Pay the bill</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default InfoBill;
