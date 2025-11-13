import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import styles from "./Confirm.styles";

// form validation
const schema = yup.object().shape({
  card: yup.string().optional(),
  phoneNumber: yup.string().optional(),
  amount: yup.string().optional(),
  otp: yup.string().required()
});

interface ConfirmTransferProps {
  transferData: any;
  onBack: () => void;
  onConfirm: (otp: string) => void;
  isPending?: boolean;
}

const ConfirmTransfer = ({
  transferData,
  onBack,
  onConfirm,
  isPending = false,
}: ConfirmTransferProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: ""
    },
  });

  const handleConfirm = (data: any) => {
    onConfirm(data.phoneNumber);
  };

  // **** jsx ****
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputs}>
        <Text style={{ fontSize: 12, color: "#989898" }}>
          Confirm transfer information
        </Text>

        {/* From - نمایش اطلاعات مبدا */}
        <View>
          <Text style={styles.label}>From</Text>
          <View style={styles.input}>
            <Text>
              {transferData?.sourceWalletId
                ? `Wallet: ${transferData.sourceWalletId}`
                : "Not specified"}
            </Text>
          </View>
        </View>

        {/* To - نمایش اطلاعات مقصد */}
        <View>
          <Text style={styles.label}>To</Text>
          <View style={styles.input}>
            <Text>
              {transferData?.destinationWalletCardNumber || "Not specified"}
            </Text>
          </View>
        </View>

        {/* Amount - نمایش مقدار */}
        <View>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.input}>
            <Text>
              {transferData?.amount
                ? `$${transferData.amount}`
                : "Not specified"}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.label}>Transaction fee</Text>
          <Controller
            name="card"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Transaction fee"
                placeholderTextColor="#CACACA"
                style={styles.input}
                value="$0.00"
                editable={false}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Content</Text>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Content"
                placeholderTextColor="#CACACA"
                style={styles.input}
                value="Transfer"
                editable={false}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Amount</Text>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Amount"
                placeholderTextColor="#CACACA"
                style={styles.input}
                value={transferData?.amount ? `$${transferData.amount}` : ""}
                editable={false}
              />
            )}
          />
        </View>
        <View style={styles.otpContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Get OTP to verify transaction</Text>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <TextInput
                  onChangeText={field.onChange}
                  placeholder="OTP"
                  placeholderTextColor="#CACACA"
                  secureTextEntry
                  style={styles.input}
                />
              )}
            />
          </View>
          <TouchableOpacity style={[styles.button, { width: 100 }]}>
            <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, !isValid && { backgroundColor: "#CACACA" }]}
        onPress={handleSubmit(handleConfirm)}
        disabled={!isValid || isPending}
      >
        <Text style={styles.buttonText}>
          {isPending ? "Processing..." : "Confirm"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmTransfer;
