import { FC, lazy, useRef } from "react";
import { CreditCardPropsType } from "@/types/creditCard";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const CreditCard = lazy(() => import("@/components/creditCard/CreditCard"));
const CardItem = lazy(() => import("@/components/home/cardItem/CardItem"));

const { width: screenWidth } = Dimensions.get("window");

const cards: CreditCardPropsType[] = [
  {
    id: 1,
    name: "John Smith",
    accountLevel: "Amazon Platinium",
    cardNumber: "4756 **** **** 9018",
    accountBalance: "3.469.52",
    theme: "blue",
  },
  {
    id: 2,
    name: "Komeil",
    accountLevel: "Amazon Platinium",
    cardNumber: "6164 **** **** 0022",
    accountBalance: "9.200",
    theme: "yellow",
  },
];

const HomeScreen: FC = () => {
  const carouselRef = useRef<any>(null);
  const renderItem = ({ item }: { item: any }) => {
    return (
      <CreditCard
        name={item?.name}
        accountLevel={item?.accountLevel}
        cardNumber={item?.cardNumber}
        accountBalance={item?.accountBalance}
        theme={item?.theme}
      />
    );
  };
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.userWrapper}>
          <Image source={require("../../../assets/images/user.png")} style={{ width: 50, height: 50 }}/>
          <Text style={styles.userTitle}>Hi, Push Puttichai</Text>
        </View>
        <View style={styles.notificationSection}>
          <MaterialIcons name="notifications" size={26} color="white" />
          <View style={styles.notificationCount}>
            <Text style={styles.notificationCounter}>3</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contentWrapper}>
        <View style={{ paddingBottom: 40 }}>
          <Carousel
            ref={carouselRef}
            loop={true}
            width={screenWidth * 0.88}
            height={250}
            autoPlay={false}
            data={cards}
            scrollAnimationDuration={500}
            renderItem={renderItem}
            mode="vertical-stack"
            style={styles.carousel}
          />
          <View style={styles.cardsContainer}>
            <CardItem
              icon={<FontAwesome5 name="wallet" size={28} color="#3629B7" />}
              title="Account and Card"
              href="/(main)/(screens)/home/AccountAndCard"
            />
            <CardItem
              icon={
                <Ionicons
                  name="git-compare-outline"
                  size={30}
                  color="#FF4267"
                />
              }
              title="Transfer"
              href="/(main)/(screens)/home/Transfer"
            />
            <CardItem
              icon={<Ionicons name="card" size={28} color="#0890FE" />}
              title="Withdraw"
              href="/(main)/(screens)/home/Withdraw"
            />
            <CardItem
              icon={<FontAwesome name="dollar" size={28} color="#FFAF2A" />}
              title="Mobile prepaid"
              href="/(main)/(screens)/home/MobilePrepaid"
            />
            <CardItem
              icon={<FontAwesome name="bookmark" size={28} color="#52D5BA" />}
              title="Pay the bill"
              href="/(main)/(screens)/home/PayBill"
            />
            <CardItem
              icon={<Ionicons name="save" size={28} color="#5655B9" />}
              title="Save online"
              href="/(main)/(screens)/home/SaveOnline"
            />
            <CardItem
              icon={<Ionicons name="card" size={28} color="#FB6B18" />}
              title="Credit card"
              href="/(main)/(screens)/home/CreditCard"
            />
            <CardItem
              icon={<MaterialIcons name="list-alt" size={28} color="#3629B7" />}
              title="Transaction report"
              href="/(main)/(screens)/home/TransactionReport"
            />
            <CardItem
              icon={
                <FontAwesome6 name="contact-book" size={28} color="#FF4267" />
              }
              title="Beneficiary"
              href="/(main)/(screens)/home/Beneficiary"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3629B7",
  },
  headerWrapper: {
    height: 110,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 18,
  },
  userTitle: {
    color: "#FFF",
    fontSize: 16,
  },
  notificationSection: {
    position: "relative",
  },
  notificationCount: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 100,
    backgroundColor: "#FF4267",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationCounter: {
    color: "#FFF",
    fontSize: 10,
  },
  contentWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 24,
  },
  cardsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: "wrap",
    rowGap: 14,
  },
  carousel: {
    justifyContent: "center",
  },
});

export default HomeScreen;
