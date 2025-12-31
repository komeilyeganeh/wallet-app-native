import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import styles from "./PayBill.styles";
import HeaderWrapper from "@/components/headerWrapper";
import { FontAwesome5 } from "@expo/vector-icons";
import Container from "@/components/common/container";
import { BillCardType } from "@/types/components/bill.types";
import BillCard from "@/components/bill/billCard";

const BILLS_DATA: BillCardType[] = [
  {
    id: 1,
    title: "Electric bill",
    subTitle: "Pay electric bill this month",
    image: (
      <Image
        source={require("../../../../../assets/images/electric.webp")}
        style={{ width: 90, height: 81 }}
      />
    ),
    href: "/(main)/(screens)/home/PayBill/ElectricBill/ElectricBill",
  },
  {
    id: 2,
    title: "Water bill",
    subTitle: "Pay water bill this month",
    image: (
      <Image
        source={require("../../../../../assets/images/water.webp")}
        style={{ width: 90, height: 81 }}
      />
    ),
    href: "/(main)/(screens)/home/PayBill/WaterBill/WaterBill",
  },
  {
    id: 3,
    title: "Mobile bill",
    subTitle: "Pay mobile bill this month",
    image: (
      <Image
        source={require("../../../../../assets/images/mobile.webp")}
        style={{ width: 90, height: 81 }}
      />
    ),
    href: "/(main)/(screens)/home/PayBill/MobileBill/MobileBill",
  },
  {
    id: 4,
    title: "Internet bill",
    subTitle: "Pay internet bill this month",
    image: (
      <Image
        source={require("../../../../../assets/images/internet.webp")}
        style={{ width: 90, height: 81 }}
      />
    ),
    href: "/(main)/(screens)/home/PayBill/InternetBill/InternetBill",
  },
];

const PayTheBillScreen = () => {
  // **** jsx ****
  return (
    <Container withWrapper>
      <HeaderWrapper
        title="Pay the bill"
        icon={
          <Link href="/(main)/(screens)/home/PayBill/history/BillHistoryScreen">
            <FontAwesome5 name="history" size={22} color="black" />
          </Link>
        }
      />
      <View style={styles.linksContainer}>
        {BILLS_DATA.map((bill: BillCardType) => (
          <BillCard
            key={bill.id}
            title={bill.title}
            subTitle={bill.subTitle}
            href={bill.href}
            image={bill.image}
          />
        ))}
      </View>
    </Container>
  );
};

export default PayTheBillScreen;
