import { CreditCardPropsType } from "@/types/creditCard";
import { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import styles from "./CreditCard.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreditCard: FC<CreditCardPropsType> = ({
  name,
  accountLevel,
  cardNumber,
  accountBalance,
  theme,
  bankName,
  isSelected = false,
}) => {
  const [isShowBalance, setIsShowBalance] = useState(true);

  useEffect(() => {
    loadBalancePreference();
  }, []);

  const loadBalancePreference = async () => {
    try {
      const savedPreference = await AsyncStorage.getItem(
        "show_balance_preference"
      );
      if (savedPreference !== null) {
        setIsShowBalance(JSON.parse(savedPreference));
      } else {
        setIsShowBalance(true);
      }
    } catch (error) {
      console.error("Error loading balance preference:", error);
      setIsShowBalance(true);
    }
  };
  const toggleBalanceVisibility = async () => {
    const newValue = !isShowBalance;
    setIsShowBalance(newValue);
    try {
      await AsyncStorage.setItem(
        "show_balance_preference",
        JSON.stringify(newValue)
      );
    } catch (error) {
      console.error("Error saving balance preference:", error);
    }
  };
  // **** jsx ****
  return (
    <View
      style={[
        styles.cardWrapper,
        {
          backgroundColor: theme === "blue" ? "#1573FF" : "#FFAF2A",
          borderWidth: isSelected ? 3 : 0,
          borderColor: isSelected ? "#FF4267" : "transparent",
          transform: isSelected ? [{ scale: 0.99 }] : [{ scale: 1 }],
        },
      ]}
    >
      {/* blue section */}
      <View
        style={[
          styles.shapeOneSection,
          {
            backgroundColor: theme === "blue" ? "#4EB4FF" : "#FFCA73",
            opacity: isSelected ? 0.9 : 1,
          },
        ]}
      ></View>

      {/* purple section */}
      <View
        style={[
          styles.shapeTwoSection,
          {
            backgroundColor: theme === "blue" ? "#1E1671" : "#FFC256",
            opacity: isSelected ? 0.9 : 1,
          },
        ]}
      ></View>

      <View style={styles.cardInfoWrapper}>
        <Text
          style={[
            styles.userName,
            { color: isSelected ? "#FFF" : styles.userName.color },
          ]}
        >
          {name}
        </Text>

        <View style={styles.moreInfoSection}>
          <Text
            style={[
              styles.accountLevel,
              { color: isSelected ? "#FFF" : styles.accountLevel.color },
            ]}
          >
            {accountLevel}
          </Text>

          <Text
            style={[
              styles.cardNumber,
              { color: isSelected ? "#FFF" : styles.cardNumber.color },
            ]}
          >
            {cardNumber}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: 15,
              }}
            >
              <Text
                style={[
                  styles.accountBalance,
                  { color: isSelected ? "#FFF" : styles.accountBalance.color },
                ]}
              >
                {isShowBalance ? `$${accountBalance}` : "****"}
              </Text>
              {isShowBalance ? (
                <Entypo
                  name="eye"
                  size={20}
                  color="white"
                  onPress={toggleBalanceVisibility}
                />
              ) : (
                <Entypo
                  name="eye-with-line"
                  size={20}
                  color="white"
                  onPress={toggleBalanceVisibility}
                />
              )}
            </View>

            <Text
              style={{
                color: isSelected ? "#FFF" : "#FFF",
                fontSize: 22,
                fontWeight: "bold",
                fontStyle: "italic",
                opacity: isSelected ? 1 : 0.8,
              }}
            >
              {bankName}
            </Text>
          </View>
        </View>

        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={styles.selectedText}>Selected</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CreditCard;
