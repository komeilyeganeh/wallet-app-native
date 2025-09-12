import { HomeCardItemType } from "@/types/homeCardItem";
import { Link } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const CardItem: FC<HomeCardItemType> = ({ icon, title, href }) => {
   const { width } = useWindowDimensions();
  return (
    <Link href={href}>
      <View style={[styles.container, { width: width * 0.27 }]}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 15,
    boxShadow: "0 5px 30px 0 rgba(0,0,0,0.1)",
    padding: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "#979797",
    fontSize: 14,
    textAlign: "center",
  },
});

export default CardItem;
