import { FC, useRef, useState, useMemo, useEffect, useCallback } from "react";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CreditCard from "@/components/creditCard";
import CardItem from "@/components/home/cardItem/CardItem";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import { MaterialIndicator } from "react-native-indicators";
import { useGetMyWallets } from "@/services/wallet/hooks";
import { useUserData } from "@/hooks/useUserData";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeposit } from "@/services/deposit/hooks";
import * as yup from "yup";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import styles from "@/assets/styles/tabs/home.styles";

const { width: screenWidth } = Dimensions.get("window");

// Validation Schema
const depositSchema = yup.object().shape({
  walletId: yup
    .number()
    .required("Please select wallet")
    .min(1, "Please select a valid wallet"),
  amount: yup
    .string()
    .required("Please enter the amount")
    .test("is-number", "Amount must be a valid number", (value) => {
      if (!value || value.trim() === "") return false;
      const num = Number(value.replace(/,/g, ""));
      return !isNaN(num) && isFinite(num);
    })
    .test("is-positive", "Amount must be greater than zero", (value) => {
      if (!value || value.trim() === "") return false;
      return Number(value.replace(/,/g, "")) > 0;
    }),
  description: yup.string().optional(),
});

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

  const [isDepositSheetOpen, setIsDepositSheetOpen] = useState(false);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);

  const loading = userLoading || walletsPending;
  const carouselRef = useRef<any>(null);
  const { mutate: deposit, isPending: isDepositing } = useDeposit();

  // Bottom Sheet ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(depositSchema),
    defaultValues: {
      walletId: 0,
      amount: "",
      description: "",
    },
    mode: "onChange",
  });

  const walletsData = myWallets?.data?.data || [];

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

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
    const numericAmount = Number(data.amount.replace(/,/g, ""));

    const depositData = {
      walletId: Number(data.walletId),
      amount: numericAmount,
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

        Alert.alert("Error", errorMessage, [{ text: "OK" }]);
      },
    });
  };

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length > 0) {
      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
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

      <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>
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
                    scaleInterval: 0.1,
                    opacityInterval: 0.2,
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.bottomSheetHandle}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetScrollView
          style={styles.bottomSheetContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Deposit Funds</Text>
            <TouchableOpacity onPress={handleCloseDepositSheet}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {selectedWallet ? (
            <>
              <View style={styles.selectedWalletCard}>
                <Text style={styles.selectedWalletTitle}>Selected Wallet</Text>
                <View style={styles.walletInfo}>
                  <Text style={styles.walletBank}>
                    {selectedWallet.bankName}
                  </Text>
                  <Text style={styles.walletNumber}>
                    {cardNumberFormat(
                      selectedWallet.cardNumber || selectedWallet.id
                    )}
                  </Text>
                  <Text style={styles.walletBalance}>
                    Balance: {selectedWallet.balance}{" "}
                    {selectedWallet.currency?.code || ""}
                  </Text>
                </View>
                <Controller
                  name="walletId"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      value={field.value?.toString()}
                      editable={false}
                      style={styles.hiddenInput}
                    />
                  )}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount *</Text>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => {
                    const displayValue = formatAmount(field.value || "");
                    return (
                      <TextInput
                        value={displayValue}
                        style={[
                          styles.input,
                          errors.amount && styles.inputError,
                        ]}
                        placeholder="Enter amount"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          const numericText = text.replace(/[^0-9]/g, "");
                          field.onChange(numericText);
                        }}
                      />
                    );
                  }}
                />
                {errors.amount && (
                  <Text style={styles.errorText}>{errors.amount.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description (Optional)</Text>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      value={field.value || ""}
                      style={[styles.input, styles.textArea]}
                      placeholder="Enter description"
                      placeholderTextColor="#999"
                      multiline
                      numberOfLines={3}
                      onChangeText={field.onChange}
                      textAlignVertical="top"
                    />
                  )}
                />
              </View>

              <View style={styles.sheetActions}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    (!isValid || isDepositing) && styles.submitButtonDisabled,
                  ]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={!isValid || isDepositing}
                >
                  {isDepositing ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.submitButtonText}>Deposit Now</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCloseDepositSheet}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.sheetLoading}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.sheetLoadingText}>
                Loading wallet information...
              </Text>
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;
