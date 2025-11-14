import { FC, useRef } from "react";
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
import CreditCard from "@/components/creditCard";
import CardItem from "@/components/home/cardItem/CardItem";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import { MaterialIndicator } from "react-native-indicators";
import { useGetMyWallets } from "@/services/wallet/hooks";
import { useUserData } from "@/hooks/useUserData";

const { width: screenWidth } = Dimensions.get("window");

const HomeScreen: FC = () => {
  const {
    user,
    userId,
    loading: userLoading,
    error: userError,
  } = useUserData();

  const {
    data: myWallets,
    isPending: walletsPending,
    error: walletsError,
  } = useGetMyWallets(userId);

  const loading = userLoading || walletsPending;

  const carouselRef = useRef<any>(null);

  const renderWalletItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <CreditCard
        name={user?.name || "User"}
        accountLevel="Wallet"
        cardNumber={cardNumberFormat(item?.cardNumber || item?.id)}
        accountBalance={item?.balance ? item.balance : "$0"}
        theme={getTheme(index)}
        bankName={item?.bankName || "Bank"}
      />
    );
  };

  const getTheme = (index: number) => {
    const themes = ["blue", "yellow"];
    return themes[index % themes.length];
  };

  const walletsData = myWallets?.data?.data || [];

  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.userWrapper}>
          <Image
            source={require("../../../assets/images/user.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text style={styles.userTitle}>Hi, {user?.name || "User"} !</Text>
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
          {userError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>User Error: {userError}</Text>
            </View>
          )}

          {walletsError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Wallets Error: {walletsError.message}
              </Text>
            </View>
          )}

          {loading ? (
            <View style={styles.loadingContainer}>
              <MaterialIndicator size={25} color="#3629B7" />
              <Text style={styles.loadingText}>
                {userLoading
                  ? "Loading user data..."
                  : "Loading your wallets..."}
              </Text>
            </View>
          ) : walletsData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No wallets found. {!userId && "User not authenticated."}
              </Text>
            </View>
          ) : (
            <>
              {walletsData.length > 1 ? (
                <Carousel
                  ref={carouselRef}
                  loop={false}
                  width={screenWidth * 0.88}
                  height={250}
                  autoPlay={false}
                  data={walletsData}
                  scrollAnimationDuration={500}
                  renderItem={renderWalletItem}
                  mode="vertical-stack"
                  style={styles.carousel}
                  modeConfig={{
                    stackInterval: 30,
                    scaleInterval: 0.10,
                    opacityInterval: 0.2,
                    moveSize: screenWidth * 0.88,
                    showLength: walletsData.length === 2 ? 2 : 3,
                  }}
                />
              ) : walletsData.length === 1 ? (
                <View>
                  {renderWalletItem({ item: walletsData[0], index: 0 })}
                </View>
              ) : null}

              {/* <View style={styles.debugInfo}>
                <Text style={styles.debugText}>
                  User: {userId ? `ID: ${userId}` : "Not logged in"} | Wallets:{" "}
                  {walletsData.length}
                </Text>
              </View> */}
            </>
          )}

          <View style={styles.cardsContainer}>
            <CardItem
              icon={<FontAwesome5 name="wallet" size={28} color="#3629B7" />}
              title="Wallets"
              href="/(main)/(screens)/home/Wallets"
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
    fontWeight: "600",
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
    fontWeight: "bold",
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
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 14,
  },
  carousel: {
    justifyContent: "center",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  emptyContainer: {
    backgroundColor: "#FEF3E2",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FA812F",
  },
  emptyText: {
    color: "#FA812F",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
  debugInfo: {
    backgroundColor: "#f8f9fa",
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#3629B7",
  },
  debugText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontFamily: "monospace",
  },
  errorContainer: {
    backgroundColor: "#ffeaea",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#ff4267",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    textAlign: "center",
  },
});

export default HomeScreen;
