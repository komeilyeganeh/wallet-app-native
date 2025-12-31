import { FC, useRef, useState, useMemo, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CreditCard from "@/components/creditCard";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import { MaterialIndicator } from "react-native-indicators";
import { useGetMyWallets } from "@/services/wallet/hooks";
import { useUserData } from "@/hooks/useUserData";
import { useForm } from "react-hook-form";
import { useDeposit } from "@/services/deposit/hooks";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import styles from "@/assets/styles/tabs/home.styles";
import UserProfileHeader from "@/components/userProfileHeader";
import DashboardCards from "@/components/dashboardCards";
import BottomSheetDeposit from "@/components/home/bottomSheetDeposit";
import { useToast } from "react-native-toast-notifications";
import { useFocusEffect } from "expo-router";
import Container from "@/components/common/container";

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
    refetch: refetchMyWallets,
  } = useGetMyWallets(userId);

  useFocusEffect(
    useCallback(() => {
      refetchMyWallets();
    }, [])
  );

  const [isDepositSheetOpen, setIsDepositSheetOpen] = useState(false);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const toast = useToast();
  const loading = userLoading || walletsPending;
  const carouselRef = useRef<any>(null);
  const { mutate: deposit, isPending: isDepositing } = useDeposit();

  // Bottom Sheet ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { reset } = useForm();

  const walletsData = myWallets?.data?.data || [];

  const handleCarouselChange = useCallback(
    (index: number) => {
      if (walletsData.length > 0 && index >= 0 && index < walletsData.length) {
        setSelectedWalletIndex(index);
      }
    },
    [walletsData]
  );

  const renderWalletItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <CreditCard
        name={user?.name || "User"}
        accountLevel="Wallet"
        cardNumber={cardNumberFormat(item?.cardNumber || item?.id)}
        accountBalance={
          item?.balance ? `${item?.currency?.symbol} ${item.balance}` : "$0"
        }
        theme={getTheme(index)}
        bankName={item?.bankName || "Bank"}
      />
    );
  };

  const getTheme = (index: number) => {
    const themes = ["blue", "yellow"];
    return themes[index % themes.length];
  };

  const handleDepositPress = () => {
    if (walletsData.length === 0) {
      Alert.alert(
        "No Wallet",
        "You need to have at least one wallet to make a deposit.",
        [{ text: "OK" }]
      );
      return;
    }

    const safeIndex = Math.max(
      0,
      Math.min(selectedWalletIndex, walletsData.length - 1)
    );
    const selectedWallet = walletsData[safeIndex];

    if (selectedWallet) {
      reset({
        walletId: selectedWallet.id || 0,
        amount: "",
        description: "",
      });
    }

    setIsDepositSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  const handleCloseDepositSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsDepositSheetOpen(false);
    reset({
      walletId: 0,
      amount: "",
      description: "",
    });
  }, [reset]);

  const selectedWallet = useMemo(() => {
    if (walletsData.length === 0) return null;

    const safeIndex = Math.max(
      0,
      Math.min(selectedWalletIndex, walletsData.length - 1)
    );
    const wallet = walletsData[safeIndex];

    if (!wallet || !wallet.id) {
      return null;
    }

    return wallet;
  }, [walletsData, selectedWalletIndex]);

  useEffect(() => {
    if (isDepositSheetOpen && selectedWallet) {
      bottomSheetRef.current?.expand();
    }
  }, [isDepositSheetOpen, selectedWallet]);

  const onSubmit = (data: any) => {
    const depositData = {
      walletId: Number(data.walletId),
      amount: +data.amount,
      description: data.description || "",
    };
    deposit(depositData, {
      onSuccess: () => {
        Alert.alert(
          "Success",
          `Deposit of ${data.amount} submitted successfully!`,
          [
            {
              text: "OK",
              onPress: () => {
                handleCloseDepositSheet();
                refetchMyWallets();
              },
            },
          ]
        );
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Deposit failed. Please try again.";
        toast.show(errorMessage, { type: "danger" });
      },
    });
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsDepositSheetOpen(false);
    }
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  // **** jsx ****
  return (
    <Container containerStyles={{ backgroundColor: "#3629B7" }}>
      {/* =============== user profile header =============== */}
      <UserProfileHeader user={user} />

      <ScrollView
        style={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      >
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
                  onSnapToItem={handleCarouselChange}
                  renderItem={renderWalletItem}
                  mode="vertical-stack"
                  style={styles.carousel}
                  modeConfig={{
                    stackInterval: 30,
                    scaleInterval: 0.13,
                    opacityInterval: 0.4,
                    moveSize: screenWidth * 0.88,
                    showLength: Math.min(walletsData.length, 3),
                  }}
                />
              ) : walletsData.length === 1 ? (
                <View>
                  {renderWalletItem({ item: walletsData[0], index: 0 })}
                </View>
              ) : null}
            </>
          )}

          <TouchableOpacity
            style={[
              styles.depositButton,
              walletsData.length === 0 && styles.depositButtonDisabled,
            ]}
            onPress={handleDepositPress}
            disabled={walletsData.length === 0}
          >
            <View style={styles.depositButtonContent}>
              <View style={styles.depositIconContainer}>
                {walletsData?.length === 0 ? (
                  <Ionicons
                    name="warning-outline"
                    size={24}
                    color="#ec2f2fff"
                  />
                ) : (
                  <Ionicons name="add-circle" size={24} color="#60ca4aff" />
                )}
              </View>
              <View style={styles.depositTextContainer}>
                <Text
                  style={[
                    styles.depositTitle && walletsData?.length === 0
                      ? { color: "#222" }
                      : { color: "#60ca4aff" },
                  ]}
                >
                  Deposit
                </Text>
                {walletsData.length === 0 && (
                  <Text style={styles.depositWarning}>
                    Create a wallet first
                  </Text>
                )}
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#60ca4aff"
                style={styles.depositChevron}
              />
            </View>
          </TouchableOpacity>

          {/* =============== render of dashboard cards =============== */}
          <DashboardCards />
          
        </View>
      </ScrollView>

      <BottomSheetDeposit
        bottomSheetRef={bottomSheetRef}
        selectedWallet={selectedWallet}
        renderBackdrop={renderBackdrop}
        handleSheetChanges={handleSheetChanges}
        handleCloseDepositSheet={handleCloseDepositSheet}
        onSubmit={onSubmit}
        isDepositing={isDepositing}
      />
    </Container>
  );
};

export default HomeScreen;
