import { FC } from "react";
import CardItem from "../home/cardItem/CardItem";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { View } from "react-native";
import { DashboardCardDataTypes } from "@/types/components/dashboardCards.types";
import styles from "./DashboardCards.styles";

const CARDS_DATA: DashboardCardDataTypes[] = [
  {
    id: 1,
    icon: <FontAwesome5 name="wallet" size={28} color="#3629B7" />,
    title: "Wallets",
    href: "/(main)/(screens)/home/Wallets",
  },
  {
    id: 2,
    icon: <Ionicons name="git-compare-outline" size={30} color="#FF4267" />,
    title: "Transfer",
    href: "/(main)/(screens)/home/Transfer",
  },
  {
    id: 3,
    icon: <Ionicons name="card" size={28} color="#0890FE" />,
    title: "Withdraw",
    href: "/(main)/(screens)/home/Withdraw",
  },
  {
    id: 4,
    icon: <MaterialIcons name="sim-card" size={28} color="#FFAF2A" />,
    title: "Mobile recharge",
    href: "/(main)/(screens)/home/MobileRecharge",
  },
  {
    id: 5,
    icon: <FontAwesome name="bookmark" size={28} color="#52D5BA" />,
    title: "Pay the bill",
    href: "/(main)/(screens)/home/PayBill",
  },
  {
    id: 6,
    icon: <Ionicons name="save" size={28} color="#5655B9" />,
    title: "Save online",
    href: "/(main)/(screens)/home/SaveOnline",
  },
  {
    id: 7,
    icon: <Ionicons name="card" size={28} color="#FB6B18" />,
    title: "Credit card",
    href: "/(main)/(screens)/home/CreditCard",
  },
  {
    id: 8,
    icon: <MaterialIcons name="list-alt" size={28} color="#3629B7" />,
    title: "Transaction report",
    href: "/(main)/(screens)/home/TransactionReport",
  },
  {
    id: 9,
    icon: <FontAwesome6 name="contact-book" size={28} color="#FF4267" />,
    title: "Beneficiary",
    href: "/(main)/(screens)/home/Beneficiary",
  },
];

const DashboardCards: FC = () => {
  return (
    <View style={styles.cardsContainer}>
      {CARDS_DATA.map((card: DashboardCardDataTypes) => (
        <CardItem
          key={card.id}
          title={card.title}
          icon={card.icon}
          href={card.href}
        />
      ))}
    </View>
  );
};

export default DashboardCards;
