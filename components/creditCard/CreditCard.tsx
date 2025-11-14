import { CreditCardPropsType } from "@/types/creditCard";
import { FC } from "react";
import { Text, View } from "react-native";
import styles from "./CreditCard.styles";

const CreditCard: FC<CreditCardPropsType> = ({ 
  name, 
  accountLevel, 
  cardNumber, 
  accountBalance, 
  theme,
  bankName,
  isSelected = false 
}) => {
  // **** jsx ****
  return (
    <View style={[
      styles.cardWrapper, 
      { 
        backgroundColor: theme === "blue" ? "#1573FF" : "#FFAF2A",
        // اضافه کردن استایل برای حالت انتخاب شده
        borderWidth: isSelected ? 3 : 0,
        borderColor: isSelected ? "#FF4267" : "transparent",
        transform: isSelected ? [{ scale: 0.98 }] : [{ scale: 1 }]
      }
    ]}>
      {/* blue section */}
      <View style={[
        styles.shapeOneSection, 
        { 
          backgroundColor: theme === "blue" ? "#4EB4FF" : "#FFCA73",
          opacity: isSelected ? 0.9 : 1
        }
      ]}></View>
      
      {/* purple section */}
      <View style={[
        styles.shapeTwoSection, 
        { 
          backgroundColor: theme === "blue" ? "#1E1671" : "#FFC256",
          opacity: isSelected ? 0.9 : 1
        }
      ]}></View>

      <View style={styles.cardInfoWrapper}>
        <Text style={[
          styles.userName,
          { color: isSelected ? "#FFF" : styles.userName.color }
        ]}>{name}</Text>
        
        <View style={styles.moreInfoSection}>
          <Text style={[
            styles.accountLevel,
            { color: isSelected ? "#FFF" : styles.accountLevel.color }
          ]}>{accountLevel}</Text>
          
          <Text style={[
            styles.cardNumber,
            { color: isSelected ? "#FFF" : styles.cardNumber.color }
          ]}>{cardNumber}</Text>
          
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[
              styles.accountBalance,
              { color: isSelected ? "#FFF" : styles.accountBalance.color }
            ]}>${accountBalance}</Text>
            
            <Text
              style={{
                color: isSelected ? "#FFF" : "#FFF",
                fontSize: 22,
                fontWeight: "bold",
                fontStyle: "italic",
                opacity: isSelected ? 1 : 0.8
              }}
            >
              {bankName}
            </Text>
          </View>
        </View>

        {/* نشانگر انتخاب شده */}
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