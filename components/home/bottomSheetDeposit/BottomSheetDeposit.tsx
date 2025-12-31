import { FC, useEffect, useMemo } from "react";
import styles from "./BottomSheetDeposit.styles";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { cardNumberFormat } from "@/lib/cardNumberFormat";
import { IBottomSheetDeposit } from "@/types/components/bottomSheetDeposit.types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const BottomSheetDeposit: FC<IBottomSheetDeposit> = ({
  bottomSheetRef,
  selectedWallet,
  renderBackdrop,
  handleSheetChanges,
  handleCloseDepositSheet,
  onSubmit,
  isDepositing
}) => {
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(depositSchema),
    defaultValues: {
      walletId: 0,
      amount: "",
      description: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedWallet) {
      reset({
        walletId: selectedWallet?.id,
        amount: watch("amount"),
        description: watch("description")
      })
    }
  }, [selectedWallet])
  
  return (
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
                <Text style={styles.walletBank}>{selectedWallet.bankName}</Text>
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
                  return (
                    <TextInput
                      style={[styles.input, errors.amount && styles.inputError]}
                      placeholder="Enter amount"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        field.onChange(text);
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
  );
};

export default BottomSheetDeposit;
