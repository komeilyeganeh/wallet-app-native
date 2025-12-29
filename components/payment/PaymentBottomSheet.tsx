// components/PaymentBottomSheet.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MaterialIndicator } from "react-native-indicators";
import SelectBox from "@/components/input/selectBox";
import { useUserData } from "@/hooks/useUserData";
import { useGetMyWallets } from "@/services/wallet/hooks";
import { cardNumberSpace } from "@/lib/cardNumberSpace";
import styles from "./PaymentBottomSheet.styles";

// تایپ‌ها
type BillData = {
  billType: string;
  billId: string;
  billNumber: string;
  amount: number;
  providerName: string;
  currencyCode: string;
  dueDate: string;
  customerName: string;
};

type PaymentFormData = {
  walletId: number;
  description?: string;
};

type PaymentBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  billData: BillData | null;
  onPaymentSubmit: (data: PaymentFormData) => void;
  isSubmitting?: boolean;
};

// Validation schema
const paymentSchema = yup.object({
  walletId: yup
    .number()
    .required("Wallet selection is required")
    .positive("Please select a valid wallet")
    .integer("Wallet ID must be an integer")
    .typeError("Please select a wallet"),
  description: yup
    .string()
    .optional()
    .default("")
    .max(200, "Description cannot exceed 200 characters"),
});

type PaymentFormValues = yup.InferType<typeof paymentSchema>;

const PaymentBottomSheet: React.FC<PaymentBottomSheetProps> = ({
  isVisible,
  onClose,
  billData,
  onPaymentSubmit,
  isSubmitting = false,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { user, userId } = useUserData();
  const {
    data: myWallets,
    isPending,
    refetch: refetchMyWallets,
  } = useGetMyWallets(userId);
  const [cardOptions, setCardOptions] = useState<any>([]);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "65%", "85%"], []);

  useEffect(() => {
    if (myWallets && myWallets.data?.data?.length > 0) {
      const options = myWallets?.data?.data.map((wallet: any) => ({
        key: wallet?.id?.toString() || wallet?.cardNumber,
        label: `${cardNumberSpace(wallet?.cardNumber)} (${wallet?.bankName})`,
        rawData: wallet,
      }));
      setCardOptions(options);
    }
  }, [myWallets]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PaymentFormValues>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      walletId: 0,
      description: billData ? `Payment for ${billData.providerName} bill` : "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
      reset({
        walletId: 0,
        description: billData
          ? `Payment for ${billData.providerName} bill - ID: ${billData.billId}`
          : "",
      });
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible, billData, reset]);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    onClose();
    reset();
  }, [onClose, reset]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
        reset();
      }
    },
    [onClose, reset]
  );

  const onSubmit = (data: any) => {
    onPaymentSubmit(data);
  };

  if (!billData) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 1 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
    >
      <BottomSheetScrollView
        contentContainerStyle={[
          styles.bottomSheetContent,
          { paddingBottom: Platform.OS === "ios" ? 40 : 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.paymentSheetHeader}>
          <Text style={styles.paymentSheetTitle}>Payment Details</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentSummary}>
          <Text style={styles.paymentSummaryLabel}>Amount to pay:</Text>
          <Text style={styles.paymentSummaryAmount}>
            {billData.amount?.toLocaleString()} {billData.currencyCode}
          </Text>
        </View>

        <View style={styles.paymentForm}>
          <View style={styles.paymentInputGroup}>
            <Text style={styles.paymentLabel}>Choose wallet</Text>
            <Controller
              name="walletId"
              control={control}
              render={({ field }) => (
                <SelectBox
                  data={cardOptions}
                  onChange={(item) => {
                    field.onChange(item.rawData.id);
                  }}
                  label="Choose wallet"
                  value={
                    cardOptions.find((w: any) => w.rawData.id === field.value)
                      ?.label || ""
                  }
                />
              )}
            />
            {errors.walletId && (
              <Text style={styles.paymentErrorText}>
                {errors.walletId.message}
              </Text>
            )}
          </View>

          <View style={styles.paymentInputGroup}>
            <Text style={styles.paymentLabel}>Description</Text>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Payment description"
                  placeholderTextColor="#CACACA"
                  style={styles.paymentInput}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              )}
            />
            {errors.description && (
              <Text style={styles.paymentErrorText}>
                {errors.description.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.confirmPaymentButton,
              (!isValid || isSubmitting) && styles.buttonDisabled,
            ]}
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <MaterialIndicator size={25} color="#fff" />
            ) : (
              <Text style={styles.confirmPaymentButtonText}>
                Confirm Payment
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default PaymentBottomSheet;
