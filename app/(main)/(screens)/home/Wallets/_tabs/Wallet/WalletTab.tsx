import { useState } from "react";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./Wallet.styles";
import { SkypeIndicator } from "react-native-indicators";
import NewCardForm from "@/components/home/newCardForm";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import CreditCard from "@/components/creditCard";
import { useGetMyWallets } from "@/services/wallet/hooks/useWallet";
import { useUserData } from "@/hooks/useUserData";

const WalletTab = () => {
  const [isShowForm, setIsShowForm] = useState(false);
   const { user, userId, loading: userLoading, error: userError } = useUserData();
  const { data: myWallets, isPending, error } = useGetMyWallets(userId);
  
  // **** return jsx ****
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 70 }}
    >
      <View style={styles.cardsWrapper}>
        {isPending ? (
          <SkypeIndicator color="#0000ff" size={40} />
        ) : myWallets?.data?.count ? (
          myWallets?.data?.data?.map((card: any, index: any) => (
            <Link
              href={{
                pathname: "/(main)/(screens)/home/AccountAndCard/CardDetail",
                params: { cardId: card?.id,cardNumber: card?.cardToken, bankName: card?.bankName },
              }}
              key={card?.id}
            >
              <CreditCard
                name={`${card?.user?.firstName} ${card?.user?.lastName}`}
                accountLevel="Amazon Platinium"
                cardNumber={cardNumberFormat(card?.cardToken)}
                accountBalance="3.469.52"
                theme={index % 2 !== 0 ? "yellow" : "blue"}
                bankName={card?.bankName}
              />
            </Link>
          ))
        ) : (
          <Text
            style={{
              backgroundColor: "#FEF3E2",
              padding: 8,
              borderRadius: 5,
              textAlign: "center",
              textTransform: "uppercase",
              color: "#FA812F",
            }}
          >
            no cards
          </Text>
        )}
        {isShowForm && (
          <NewCardForm setIsShowForm={setIsShowForm} />
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

export default WalletTab;
