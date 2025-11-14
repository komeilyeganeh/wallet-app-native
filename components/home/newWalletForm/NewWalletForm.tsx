import { FC, useState } from "react";
import SelectBox from "@/components/input/selectBox/SelectBox";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./NewCardForm.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCurrencies } from "@/services/currency/hooks";
import { useUserData } from "@/hooks/useUserData";
import { useNewWallet } from "@/services/wallet/hooks";
import { useToast } from "react-native-toast-notifications";

const schema = yup.object().shape({
  currencyId: yup.string().required("Currency is required"),
  balance: yup
    .string()
    .required("Balance is required")
    .test("is-positive", "Balance must be positive", (value) => {
      return Number(value) > 0;
    }),
  accountHolderName: yup.string().required("Account holder name is required"),
  iban: yup.string().required("IBAN is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits"),
  bankName: yup.string().required("Bank name is required"),
});

const NewWalletForm: FC<{
  setIsShowForm: (status: boolean) => void;
}> = ({ setIsShowForm }) => {
  const queryClient = useQueryClient();
  const { userId } = useUserData();
  const { data: currencies, isPending: currencyPending } = useGetCurrencies();
  const { mutate: mutateNewWallet, isPending: newWalletPending } =
    useNewWallet();
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const toast = useToast();

  const currencyOptions =
    currencies?.data?.data?.map((currency: any) => ({
      key: currency.id.toString(),
      label: `${currency.name} (${currency.symbol})`,
    })) || [];

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currencyId: "",
      balance: "",
      accountHolderName: "",
      iban: "",
      cardNumber: "",
      bankName: "",
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      const parsedUserId = userId ? JSON.parse(userId) : null;

      const params = {
        ...formData,
        currencyId: Number(formData.currencyId),
        balance: Number(formData.balance),
        userId: parsedUserId,
      };

      mutateNewWallet(params, {
        onSuccess: (res) => {
          if (res?.data) {
            setIsShowForm(false);
            queryClient.invalidateQueries({ queryKey: ["get_wallets"] });
          }
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.response?.data?.error?.message ||
            error?.message ||
            "Error. Please try again.";

          toast.show(errorMessage, {
            type: "danger",
          });
        },
      });
    } catch (error) {
      toast.show(`Error submitting form: ${error}`, { type: "danger" });
    }
  };

  // **** return jsx ****
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputs}>
        <View>
          <Text style={styles.label}>Currency</Text>
          <Controller
            name="currencyId"
            control={control}
            render={({ field }) => (
              <SelectBox
                {...field}
                data={currencyOptions}
                onChange={(e) => {
                  setSelectedCurrency(e.label);
                  field.onChange(e.key);
                }}
                label="Choose currency"
                value={selectedCurrency}
                disabled={currencyPending}
              />
            )}
          />
          {errors.currencyId && (
            <Text style={styles.errorText}>{errors.currencyId.message}</Text>
          )}
          {currencyPending && (
            <Text style={styles.loadingText}>Loading currencies...</Text>
          )}
        </View>

        {/* Balance */}
        <View>
          <Text style={styles.label}>Balance</Text>
          <Controller
            name="balance"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                onChangeText={(text) => {
                  const numbersOnly = text.replace(/[^0-9.]/g, "");
                  field.onChange(numbersOnly);
                }}
                placeholder="Enter balance"
                placeholderTextColor="#CACACA"
                style={styles.input}
                keyboardType="decimal-pad"
              />
            )}
          />
          {errors.balance && (
            <Text style={styles.errorText}>{errors.balance.message}</Text>
          )}
        </View>

        {/* Account Holder Name */}
        <View>
          <Text style={styles.label}>Account Holder Name</Text>
          <Controller
            name="accountHolderName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                placeholder="Enter account holder name"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
          {errors.accountHolderName && (
            <Text style={styles.errorText}>
              {errors.accountHolderName.message}
            </Text>
          )}
        </View>

        {/* IBAN */}
        <View>
          <Text style={styles.label}>IBAN</Text>
          <Controller
            name="iban"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                placeholder="Enter IBAN"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
          {errors.iban && (
            <Text style={styles.errorText}>{errors.iban.message}</Text>
          )}
        </View>

        {/* Card Number */}
        <View>
          <Text style={styles.label}>Card Number</Text>
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                onChangeText={(text) => {
                  const numbersOnly = text.replace(/[^0-9]/g, "");
                  field.onChange(numbersOnly);
                }}
                placeholder="Enter card number (16 digits)"
                placeholderTextColor="#CACACA"
                style={styles.input}
                keyboardType="numeric"
                maxLength={16}
              />
            )}
          />
          {errors.cardNumber && (
            <Text style={styles.errorText}>{errors.cardNumber.message}</Text>
          )}
        </View>

        {/* Bank Name */}
        <View>
          <Text style={styles.label}>Bank Name</Text>
          <Controller
            name="bankName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                placeholder="Enter bank name"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
          {errors.bankName && (
            <Text style={styles.errorText}>{errors.bankName.message}</Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (!isValid || newWalletPending || currencyPending) &&
            styles.buttonDisabled,
        ]}
        disabled={!isValid || newWalletPending || currencyPending}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>
          {newWalletPending ? "Saving..." : "Save"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewWalletForm;
