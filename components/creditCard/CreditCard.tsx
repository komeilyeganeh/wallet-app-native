import { CreditCardPropsType } from "@/types/creditCard";
import { FC } from "react";
import { Text, View } from "react-native";
import styles from "./CreditCard.styles";

const CreditCard: FC<CreditCardPropsType> = ({ name, accountLevel, cardNumber, accountBalance, theme,bankName }) => {
  // **** jsx ****
  return (
    <View style={[styles.cardWrapper, { backgroundColor: theme === "blue" ? "#1573FF" : "#FFAF2A" }]}>
      {/* blue section */}
      <View style={[styles.shapeOneSection, { backgroundColor: theme === "blue" ? "#4EB4FF" : "#FFCA73" }]}></View>
      {/* purple section */}
      <View style={[styles.shapeTwoSection, { backgroundColor: theme === "blue" ? "#1E1671" : "#FFC256" }]}></View>

      <View style={styles.cardInfoWrapper}>
        <Text style={styles.userName}>{name}</Text>
        <View style={styles.moreInfoSection}>
          <Text style={styles.accountLevel}>{accountLevel}</Text>
          <Text style={styles.cardNumber}>{cardNumber}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.accountBalance}>${accountBalance}</Text>
            <Text
              style={{
                color: "#FFF",
                fontSize: 22,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {bankName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreditCard;
