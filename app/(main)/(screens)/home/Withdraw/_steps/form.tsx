import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import SelectBox from "@/components/input/selectBox";
import { useUserData } from "@/hooks/useUserData";
import { useGetMyWallets } from "@/services/wallet/hooks";
import { cardNumberSpace } from "@/lib/cardNumberSpace";
import { useWithdraw } from "@/services/withdraw/hooks";
import { MaterialIndicator } from "react-native-indicators";

// form validation
const schema = yup.object().shape({
  walletId: yup.string().required("Please select wallet"),
  amount: yup
    .string()
    .required("Please enter the amount")
    .test(
      "is-number",
      "Amount must be numeric",
      (value) => !isNaN(Number(value))
    ),
  description: yup.string().optional(),
});

const WithdrawForm = ({ setStep }: { setStep: (step: number) => void }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cardOptions, setCardOptions] = useState<any>([]);
  const { user, userId } = useUserData();
  const {
    data: myWallets,
    isPending,
    refetch: refetchMyWallets,
  } = useGetMyWallets(userId);
  const { mutate: withdraw, isPending: isSubmitting } = useWithdraw();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      walletId: "",
      amount: "",
      description: "",
    },
  });
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

  const onSubmit = (data: any) => {
    const { amount, walletId } = data;
    const params = {
      ...data,
      amount: Number(amount),
      walletId: Number(walletId),
    };
    const selectedWallet = cardOptions.find(
      (option: any) => option.key === data.walletId
    );
    if (selectedWallet && params.amount > selectedWallet.rawData.balance) {
      Alert.alert(
        "Insufficient Balance",
        `Your balance is ${selectedWallet.rawData.balance} ${selectedWallet.rawData.currency.code}. Please enter a smaller amount.`,
        [{ text: "OK" }]
      );
      return;
    }
    withdraw(params, {
      onSuccess: () => {
        reset();
        setSelectedItem(null);
        setStep(2);
        refetchMyWallets();
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Withdrawal failed. Please try again.";
        Alert.alert("Error", errorMessage, [
          {
            text: "Try Again",
            style: "default",
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => reset(),
          },
        ]);
      },
    });
  };

  // **** jsx ****
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputs}>
        <View>
          <Text style={styles.label}>Choose wallet</Text>
          <Controller
            name="walletId"
            control={control}
            render={({ field }) => (
              <SelectBox
                {...field}
                data={cardOptions}
                onChange={(e) => {
                  setSelectedItem(e.label);
                  field.onChange(e.key);
                }}
                label="Choose wallet"
                value={selectedItem}
                disabled={isPending || cardOptions.length === 0}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Choose amount</Text>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Amount"
                placeholderTextColor="#CACACA"
                style={styles.input}
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
                onChangeText={field.onChange}
                placeholder="description"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, (!isValid || isSubmitting) && styles.buttonDisabled]}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? <MaterialIndicator size={25} color="#fff" /> : "Confirm"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 26,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 14,
    rowGap: 25,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
  },
  label: {
    fontSize: 12,
    color: "#989898",
  },
  input: {
    borderRadius: 14.5,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    padding: 11.5,
    fontSize: 14,
    marginTop: 7,
    color: "#333",
  },
  button: {
    height: 44,
    borderRadius: 15,
    backgroundColor: "#3629B7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#F2F1F9",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default WithdrawForm;
