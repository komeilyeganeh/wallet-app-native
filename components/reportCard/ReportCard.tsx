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
}) => {
  // **** jsx ****
  return (
    <Link href="/(main)/(tabs)/home">
      <View style={styles.container}>
        <View style={[styles.icon, { backgroundColor: color }]}>{icon}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.messageTitle}>{title}</Text>
          <Text style={styles.messageDesc}>{description}</Text>
        </View>
        <Text
          style={[
            styles.amount,
            amount < 0 ? { color: "#FF4267" } : { color: "#281C9D" },
          ]}
        >
          {amount < 0 ? `${String(amount).split("-").join("- $")}` : `+ $${amount}`}
        </Text>
      </View>
    </Link>
  );
};

export default ReportCard;
