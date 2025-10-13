import { useState } from "react";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./Card.styles";
import { useGetCards } from "./api/useCards";
import { SkypeIndicator } from "react-native-indicators";
import NewCardForm from "@/components/home/newCardForm";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import CreditCard from "@/components/creditCard";

const CardTab = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const { data: myCards, isPending, refetch } = useGetCards();
  // **** return jsx ****
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 70 }}>
      <View style={styles.cardsWrapper}>
        {isPending ? (
          <SkypeIndicator color="#0000ff" size={40} />
        ) : myCards?.data?.count ? (
          myCards?.data?.data?.map((card: any) => (
            <Link
              href="/(main)/(screens)/home/AccountAndCard/CardDetail"
              key={card?.id}
            >
              <CreditCard
                name={`${card?.user?.firstName} ${card?.user?.lastName}`}
                accountLevel="Amazon Platinium"
                cardNumber={cardNumberFormat(card?.cardToken)}
                accountBalance="3.469.52"
                theme={card?.id % 2 === 0 ? "yellow" : "blue"}
                bankName={card?.bankName}
              />
            </Link>
          ))
        ) : (
          <Text
            style={{
              backgroundColor: "#ff8282ff",
              padding: 8,
              borderRadius: 5,
              textAlign: "center",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            no cards
          </Text>
        )}
        {isShowForm && (
          <NewCardForm setIsShowForm={setIsShowForm} refetch={refetch} />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsShowForm(true)}
        >
          <Text style={styles.buttonText}>Add new card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CardTab;
