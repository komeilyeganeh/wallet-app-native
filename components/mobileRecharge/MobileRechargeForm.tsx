// components/MobileRechargeForm.tsx
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as yup from "yup";
import { MaterialIndicator } from "react-native-indicators";
import { useToast } from "react-native-toast-notifications";
import SelectBox from "@/components/input/selectBox/SelectBox";
import { AntDesign } from "@expo/vector-icons";
import PaymentBottomSheet from "@/components/payment/PaymentBottomSheet";
import styles from "./MobileRechargeForm.styles";
import { useGetMyWallets } from "@/services/wallet/hooks";
import { useUserData } from "@/hooks/useUserData";
import { cardNumberSpace } from "@/lib/cardNumberSpace";
import { useMobileRecharge } from "@/services/recharge/hooks";
import RechargeConfirmationSheet from "../rechargeBottomSheet/RechargeBottomSheet";

// form validation
const schema = yup.object().shape({
  walletId: yup.number().required("Wallet selection is required"),
  operator: yup.string().required("Operator selection is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  amount: yup.number().required("Amount is required"),
  description: yup.string().optional().default(""),
});

type MobileRechargeFormProps = {
  defaultOperator?: string;
};

type RechargeData = {
  walletId: number;
  operator: string;
  phoneNumber: string;
  amount: number;
  description?: string;
};

const MobileRechargeForm = ({
  defaultOperator = "",
}: MobileRechargeFormProps) => {
  const toast = useToast();
  const [showConfirmationSheet, setShowConfirmationSheet] = useState(false);
  const [selectedRechargeData, setSelectedRechargeData] =
    useState<RechargeData | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const { userId } = useUserData();
  const { data: myWallets, isPending: isPendingWallets } =
    useGetMyWallets(userId);
  const { mutate: mutateRecharge, isPending: isPendingRecharge } =
    useMobileRecharge();

  const [cardOptions, setCardOptions] = useState<any>([]);

  const operators = [
    { key: "mci", label: "Hamrah Aval", value: "MCI" },
    { key: "mtn", label: "Irancell", value: "MTN" },
    { key: "rightel", label: "Rightel", value: "Rightel" },
  ];

  const amountOptions = [
    { value: 10000, label: "10,000" },
    { value: 20000, label: "20,000" },
    { value: 50000, label: "50,000" },
    { value: 100000, label: "100,000" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      walletId: 0,
      operator: defaultOperator,
      phoneNumber: "",
      amount: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (myWallets && myWallets.data?.data?.length > 0) {
      const options = myWallets.data.data.map((wallet: any) => ({
        key: wallet?.id?.toString(),
        label: `${cardNumberSpace(wallet?.cardNumber)} (${wallet?.bankName})`,
        rawData: wallet,
      }));
      setCardOptions(options);
    }
  }, [myWallets]);

  const onSubmit = (data: any) => {    
    const rechargeData: RechargeData = {
      walletId: watch("walletId"),
      operator: data.operator,
      phoneNumber: data.phoneNumber,
      amount: data.amount,
      description:
        data.description || `Charge ${data.operator} - ${data.phoneNumber}`,
    };    
    setSelectedRechargeData(rechargeData);
    setShowConfirmationSheet(true);
  };

  const handleClosePaymentSheet = () => {
    setShowConfirmationSheet(false);
    setSelectedRechargeData(null);
  };

  const handleRechargeSubmit = () => {
    if (!selectedRechargeData) return;

    const rechargePayload = {
      walletId: watch("walletId"),
      operator: selectedRechargeData.operator,
      phoneNumber: selectedRechargeData.phoneNumber,
      amount: selectedRechargeData.amount,
      description:
        selectedRechargeData.description ||
        `Charge ${selectedRechargeData.operator} - ${selectedRechargeData.phoneNumber}`,
    };

    mutateRecharge(rechargePayload, {
      onSuccess: () => {
        toast.show("Charging was successful!", { type: "success" });
        handleClosePaymentSheet();
        reset();
        setSelectedOperator(null);
        setSelectedAmount(null);
        setSelectedItem(null);
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Charging failed. Please try again.";
        toast.show(errorMessage, { type: "danger" });
      },
    });
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    reset({
      ...watch(),
      amount,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>Choose wallet</Text>
              <Controller
                name="walletId"
                control={control}
                render={({ field }) => (
                  <SelectBox
                    data={cardOptions}
                    onChange={(item) => {
                      setSelectedItem(item);
                      field.onChange(item.rawData.id);
                    }}
                    label="Choose your wallet"
                    value={selectedItem?.label}
                    disabled={isPendingWallets || cardOptions.length === 0}
                  />
                )}
              />
              {errors.walletId && (
                <Text style={styles.errorText}>{errors.walletId.message}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Choose operator</Text>
              <View style={styles.operatorContainer}>
                {operators.map((operator) => (
                  <TouchableOpacity
                    key={operator.key}
                    style={[
                      styles.operatorItem,
                      selectedOperator === operator.value &&
                        styles.itemSelected,
                    ]}
                    onPress={() => {
                      setSelectedOperator(operator.value);
                      reset({
                        ...watch(),
                        operator: operator.value,
                      });
                    }}
                  >
                    <Text
                      style={[
                        styles.operatorText,
                        selectedOperator === operator.value &&
                          styles.valueSelected,
                      ]}
                    >
                      {operator.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.operator && (
                <Text style={styles.errorText}>{errors.operator.message}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Phone number</Text>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="09xxxxxxxxx"
                    placeholderTextColor="#CACACA"
                    style={[
                      styles.input,
                      errors.phoneNumber && styles.inputError,
                    ]}
                    keyboardType="phone-pad"
                    maxLength={11}
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Choose amount</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.amountContainer}>
                  {amountOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.amountItem,
                        selectedAmount === option.value && styles.itemSelected,
                      ]}
                      onPress={() => handleAmountSelect(option.value)}
                    >
                      <Text
                        style={[
                          styles.amountValue,
                          selectedAmount === option.value &&
                            styles.valueSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount.message}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Desired amount</Text>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextInput
                    value={field.value?.toString()}
                    onChangeText={(text) => {
                      const value = text ? parseInt(text.replace(/,/g, "")) : 0;
                      field.onChange(value);
                      setSelectedAmount(value);
                    }}
                    placeholder="Enter the amount"
                    placeholderTextColor="#CACACA"
                    style={[styles.input, errors.amount && styles.inputError]}
                    keyboardType="numeric"
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>Description</Text>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Charge Description"
                    placeholderTextColor="#CACACA"
                    style={[styles.input, styles.textArea]}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                )}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!isValid || isPendingRecharge) && styles.buttonDisabled,
            ]}
            disabled={!isValid || isPendingRecharge}
            onPress={handleSubmit(onSubmit)}
          >
            {isPendingRecharge ? (
              <MaterialIndicator size={25} color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Check & Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <RechargeConfirmationSheet
        isVisible={showConfirmationSheet}
        onClose={handleClosePaymentSheet}
        rechargeData={selectedRechargeData}
        onConfirm={handleRechargeSubmit}
        isSubmitting={isPendingRecharge}
      />
    </View>
  );
};

export default MobileRechargeForm;
