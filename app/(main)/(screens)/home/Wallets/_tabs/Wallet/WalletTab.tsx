import { useState } from "react";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./Wallet.styles";
import { SkypeIndicator } from "react-native-indicators";
import NewCardForm from "@/components/home/newWalletForm";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import CreditCard from "@/components/creditCard";
import { useGetMyWallets } from "@/services/wallet/hooks";
import { useUserData } from "@/hooks/useUserData";

const WalletTab = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const { user, userId } = useUserData();
  const { data: myWallets, isPending } = useGetMyWallets(userId);
  

  // **** return jsx ****
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 70 }}
    >
      <View style={styles.cardsWrapper}>
        {isPending ? (
          <SkypeIndicator color="#0000ff" size={40} />
        ) : myWallets?.data?.data?.length > 0 ? (
          myWallets?.data?.data?.map((wallet: any, index: any) => (
            <Link
              href={{
                pathname: "/(main)/(screens)/home/Wallets/WalletDetail",
                params: { 
                  walletId: wallet?.id,
                },
              }}
              key={wallet?.id}
            >
              <CreditCard
                name={wallet?.accountHolderName || `${user?.name}`}
                accountLevel="Wallet"
                cardNumber={cardNumberFormat(wallet?.cardNumber || wallet?.id)}
                accountBalance={wallet?.balance ? `${wallet.balance}` : "$0"}
                theme={index % 2 !== 0 ? "yellow" : "blue"}
                bankName={wallet?.bankName}
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
            no wallets
          </Text>
        )}
        {isShowForm && (
          <NewCardForm setIsShowForm={setIsShowForm} />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsShowForm(true)}
        >
          <Text style={styles.buttonText}>Add new wallet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WalletTab;