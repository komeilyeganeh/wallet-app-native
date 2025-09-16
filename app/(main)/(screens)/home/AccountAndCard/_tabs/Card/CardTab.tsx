import { lazy } from "react";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Card.styles";

const CreditCard = lazy(() => import("@/components/creditCard"))

const CardTab = () => {
  return (
    <View style={styles.cardsWrapper}>
      <Link href="/(main)/(screens)/home/AccountAndCard/CardDetail">
        <CreditCard
          name="John Smith"
          accountLevel="Amazon Platinium"
          cardNumber="4756 **** **** 9018"
          accountBalance="3.469.52"
          theme="blue"
        />
      </Link>
      <Link href="/(main)/(screens)/home/AccountAndCard/CardDetail">
        <CreditCard
          name="Komeil"
          accountLevel="Amazon Platinium"
          cardNumber="6164 **** **** 0022"
          accountBalance="9.200"
          theme="yellow"
        />
      </Link>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add new card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardTab;
