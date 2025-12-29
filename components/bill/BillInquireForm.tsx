// components/BillInquiryForm.tsx
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { MaterialIndicator } from "react-native-indicators";
import { useToast } from "react-native-toast-notifications";
import { useInquireBill, usePayBill } from "@/services/bill/hooks";
import PaymentBottomSheet from "@/components/payment/PaymentBottomSheet";
import styles from "./BillInquireForm.styles";

// form validation
const schema = yup.object().shape({
  billType: yup.string().required("Bill type is required"),
  billId: yup.string().required("Bill ID is required"),
  billNumber: yup.string().required("Bill number is required"),
});

type BillInquiryFormProps = {
  defaultBillType: string;
  providerName: string;
};

type BillData = {
  billType: string;
  billId: string;
  billNumber: string;
  amount: number;
  providerName: string;
  currencyCode: string;
  customerName: string;
  dueDate: string;
  isPayable: boolean;
  errorMessage?: string;
};

const BillInquiryForm = ({ defaultBillType }: BillInquiryFormProps) => {
  const toast = useToast();
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [selectedBillData, setSelectedBillData] = useState<BillData | null>(
    null
  );

  const {
    data: billInfo,
    mutate: mutateInquireBill,
    isPending: isPendingInquireBill,
  } = useInquireBill();

  const { mutate: mutatePayBill, isPending: isPendingPayment } = usePayBill();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      billType: defaultBillType,
      billId: "",
      billNumber: "",
    },
  });

  const onSubmit = async (data: any) => {
    mutateInquireBill(data, {
      onSuccess: () => {
        reset();
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Inquiry failed. Please try again.";
        toast.show(errorMessage, { type: "danger" });
      },
    });
  };

  const handleOpenPaymentSheet = () => {
    if (billInfo?.data.data) {
      setSelectedBillData(billInfo.data.data);
      setShowPaymentSheet(true);
    }
  };

  const handleClosePaymentSheet = () => {
    setShowPaymentSheet(false);
    setSelectedBillData(null);
  };

  const handlePaymentSubmit = (paymentData: {
    walletId: number;
    description?: string;
  }) => {
    if (!selectedBillData) return;

    const paymentPayload = {
      walletId: paymentData.walletId,
      billType: selectedBillData.billType,
      billId: selectedBillData.billId,
      billNumber: selectedBillData.billNumber,
      amount: selectedBillData.amount,
      description: paymentData.description,
      providerName: selectedBillData.providerName,
    };

    mutatePayBill(paymentPayload, {
      onSuccess: () => {
        toast.show("Payment successful!", { type: "success" });
        handleClosePaymentSheet();
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Payment failed. Please try again.";
        toast.show(errorMessage, { type: "danger" });
      },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>Enter bill ID</Text>
              <Controller
                name="billId"
                control={control}
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Bill ID"
                    placeholderTextColor="#CACACA"
                    style={[styles.input, errors.billId && styles.inputError]}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.billId && (
                <Text style={styles.errorText}>{errors.billId.message}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Enter bill number</Text>
              <Controller
                name="billNumber"
                control={control}
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Bill Number"
                    placeholderTextColor="#CACACA"
                    style={[
                      styles.input,
                      errors.billNumber && styles.inputError,
                    ]}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.billNumber && (
                <Text style={styles.errorText}>
                  {errors.billNumber.message}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!isValid || isPendingInquireBill) && styles.buttonDisabled,
            ]}
            disabled={!isValid || isPendingInquireBill}
            onPress={handleSubmit(onSubmit)}
          >
            {isPendingInquireBill ? (
              <MaterialIndicator size={25} color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Check Bill</Text>
            )}
          </TouchableOpacity>
        </View>

        {billInfo?.data.data && (
          <View style={styles.billInfoContainer}>
            <Text style={styles.billInfoTitle}>Bill Information</Text>

            <View style={styles.billInfoItem}>
              <Text style={styles.billInfoLabel}>Customer</Text>
              <Text style={styles.billInfoValue}>
                {billInfo.data.data.customerName}
              </Text>
            </View>

            <View style={styles.billInfoItem}>
              <Text style={styles.billInfoLabel}>Bill ID</Text>
              <Text style={styles.billInfoValue}>
                {billInfo.data.data.billId}
              </Text>
            </View>

            <View style={styles.billInfoItem}>
              <Text style={styles.billInfoLabel}>Bill Number</Text>
              <Text style={styles.billInfoValue}>
                {billInfo.data.data.billNumber}
              </Text>
            </View>

            <View style={styles.billInfoItem}>
              <Text style={styles.billInfoLabel}>Provider</Text>
              <Text style={styles.billInfoValue}>
                {billInfo.data.data.providerName}
              </Text>
            </View>

            <View style={styles.billInfoItem}>
              <Text style={styles.billInfoLabel}>Due Date</Text>
              <Text style={styles.billInfoValue}>
                {formatDate(billInfo.data.data.dueDate)}
              </Text>
            </View>

            <View style={styles.billInfoItem}>
              <Text style={styles.billInfoLabel}>Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: billInfo.data.data.isPayable
                      ? billInfo.data.data.amount > 0
                        ? "#34C759"
                        : "#FF9500"
                      : "#FF3B30",
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {billInfo.data.data.isPayable
                    ? billInfo.data.data.amount > 0
                      ? "Payable"
                      : "No Amount Due"
                    : "Not Payable"}
                </Text>
              </View>
            </View>

            {billInfo.data.data.errorMessage && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>
                  {billInfo.data.data.errorMessage}
                </Text>
              </View>
            )}

            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Total</Text>
              <Text style={styles.amountValue}>
                {billInfo.data.data.amount?.toLocaleString()}{" "}
                {billInfo.data.data.currencyCode}
              </Text>
            </View>

            {billInfo.data.data.isPayable && billInfo.data.data.amount > 0 && (
              <TouchableOpacity
                style={styles.payButton}
                onPress={handleOpenPaymentSheet}
              >
                <Text style={styles.payButtonText}>Pay the bill</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      <PaymentBottomSheet
        isVisible={showPaymentSheet}
        onClose={handleClosePaymentSheet}
        billData={selectedBillData}
        onPaymentSubmit={handlePaymentSubmit}
        isSubmitting={isPendingPayment}
      />
    </View>
  );
};

export default BillInquiryForm;
