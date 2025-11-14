import { ReportCardPropsType } from "@/types/components/reportCard";
import { Link } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";
import styles from "./ReportCard.styles";

const ReportCard: FC<ReportCardPropsType> = ({
  icon,
  color,
  title,
  amount,
  description,
  currency = "USD",
  isSuccess = true
}) => {
  const formatAmount = () => {
    const absoluteAmount = Math.abs(amount);
    const sign = amount < 0 ? "-" : "+";
    
    if (currency) {
      return `${sign} ${currency} ${absoluteAmount.toLocaleString()}`;
    }
    
    return `${sign} $${absoluteAmount.toLocaleString()}`;
  };

  const getAmountColor = () => {
    if (!isSuccess) {
      return "#FF4267";
    }
    return amount < 0 ? "#FF4267" : "#281C9D";
  };

  // const getStatusIcon = () => {
  //   if (isSuccess) {
  //     return "✓";
  //   }
  //   return "✗";
  // };

  // **** jsx ****
  return (
    <Link href="/(main)/(tabs)/home">
      <View style={styles.container}>
        <View style={[styles.icon, { backgroundColor: color }]}>
          {icon}
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.messageTitle}>{title}</Text>
            {/* <Text style={[
              styles.statusIndicator,
              { color: isSuccess ? "#52D5BA" : "#FF4267" }
            ]}>
              {getStatusIcon()}
            </Text> */}
          </View>
          <Text style={[
            styles.messageDesc,
            { color: isSuccess ? "#52D5BA" : "#FF4267" }
          ]}>
            {description}
          </Text>
        </View>
        
        <Text style={[styles.amount, { color: getAmountColor() }]}>
          {formatAmount()}
        </Text>
      </View>
    </Link>
  );
};

export default ReportCard;