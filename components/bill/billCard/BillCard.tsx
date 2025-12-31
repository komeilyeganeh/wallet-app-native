import { BillCardTypeProps } from "@/types/components/bill.types";
import { Link } from "expo-router";
import { FC } from "react";
import { Image, Text, View } from "react-native";
import styles from "./BillCard.styles";

const BillCard: FC<BillCardTypeProps> = ({ title, subTitle, href, image }) => {
  return (
    <Link href={href}>
      <View style={styles.linkItem}>
        <View style={styles.linkTitleWrapper}>
          <Text style={styles.linkTitle}>{title}</Text>
          <Text style={styles.linkSubTitle}>{subTitle}</Text>
        </View>
        {image}
      </View>
    </Link>
  );
};

export default BillCard;
