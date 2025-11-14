import SelectBox from "@/components/input/selectBox/SelectBox";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import * as yup from "yup";
import styles from "./Form.styles";
import { cardNumberSpace } from "@/lib/cardNumberSpace";
import { useTransferAmount } from "./api/useTransfer";
import { MaterialIndicator } from "react-native-indicators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clientAxios } from "@/lib/http";

// form validation
const schema = yup.object().shape({
  sourceWalletId: yup.string().required("Please select the source wallet"),
  destinationWalletCardNumber: yup
    .string()
    .required("Destination card number is required")
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits"),
  amount: yup
    .string()
    .required("Amount is required")
    .test("is-positive", "Amount must be greater than zero", (value) => {
      const num = Number(value);
      return !isNaN(num) && num > 0;
    }),
});

async function getWallets(userId: string) {
  try {
    const res = await clientAxios.get(`/User/GetById/${userId}`);
    const wallets = res?.data?.data?.wallets || 
                   res?.data?.wallets || 
                   res?.data?.data || 
                   [];
    return Array.isArray(wallets) ? wallets : [];
  } catch (err: any) {
    console.log("Error in getWallets:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      url: err.config?.url
    });
    throw err;
  }
}

const TransferForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (data: any) => void;
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cardOptions, setCardOptions] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { isPending } = useTransferAmount();

  const loadWallets = async (isRefresh = false) => {
    if (hasLoaded && !isRefresh) return;

    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        setError("User ID not found in storage");
        setLoading(false);
        return;
      }
      let parsedUserId;
      try {
        parsedUserId = JSON.parse(userId);
      } catch (parseError) {
        parsedUserId = userId;
      }

      if (!parsedUserId) {
        setError("Invalid User ID");
        setLoading(false);
        return;
      }

      const wallets = await getWallets(parsedUserId);
      if (wallets.length === 0) {
        setError("No wallets found for this user");
      }

      const options = wallets.map((wallet: any) => {
        const cardNumber = wallet?.cardNumber || wallet?.cardToken || '';
        const bankName = wallet?.bankName || 'Unknown Bank';
        
        return {
          key: wallet?.id?.toString() || wallet?.cardNumber,
          label: `${cardNumberSpace(cardNumber)} (${bankName})`,
          rawData: wallet
        };
      });

      setCardOptions(options);
      setHasLoaded(true);
      
    } catch (err: any) {
      setError(err.message || "Failed to load wallets");
      setCardOptions([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const initialize = async () => {
      if (!isMounted) return;
      
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId && !hasLoaded) {
          await loadWallets();
        } else if (!userId) {
          setError("User ID not found");
          setLoading(false);
        }
      } catch (err) {
        console.log("Initialization error:", err);
        setLoading(false);
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timeout;

    const checkUserId = async () => {
      if (!isMounted || hasLoaded) return;
      
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId && !hasLoaded) {
          await loadWallets();
          if (isMounted) {
            clearInterval(intervalId);
          }
        }
      } catch (err) {
        console.log("Error checking userId:", err);
      }
    };

    if (!hasLoaded && !loading) {
      intervalId = setInterval(checkUserId, 5000);
    }

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [hasLoaded, loading]);

  const onRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    loadWallets(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sourceWalletId: "",
      destinationWalletCardNumber: "",
      amount: "",
    },
    mode: "onChange",
  });

  const isFormValid = isValid && !isPending && !loading;

  const handlerTransfer = (formData: any) => {
    const params = {
      ...formData,
      sourceWalletId: Number(formData?.sourceWalletId),
      amount: Number(formData?.amount),
    };
    onFormSubmit(params);
  };

  const formValues = watch();

  // **** jsx ****
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          enabled={!loading}
        />
      }
    >
      <View style={styles.formContainer}>
        <View style={styles.inputs}>
          
          {loading && (
            <View style={styles.statusContainer}>
              <MaterialIndicator size={20} color="#3629B7" />
              <Text style={styles.statusText}>Loading wallets...</Text>
            </View>
          )}
          
          {error && !loading && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                onPress={() => loadWallets(true)} 
                style={styles.retryButton}
                disabled={loading}
              >
                <Text style={styles.retryButtonText}>
                  {loading ? "Loading..." : "Retry"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>Source info</Text>
          <View>
            <Controller
              name="sourceWalletId"
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
                  disabled={loading || cardOptions.length === 0}
                />
              )}
            />
            {errors.sourceWalletId && (
              <Text style={styles.errorText}>
                {errors.sourceWalletId.message}
              </Text>
            )}
            {!loading && cardOptions.length === 0 && !error && (
              <Text style={styles.infoText}>
                No wallets available. Please check your account.
              </Text>
            )}
          </View>

          <Text style={styles.label}>Destination info</Text>
          <View style={styles.form}>
            <Controller
              name="destinationWalletCardNumber"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  onChangeText={(text) => {
                    const numbersOnly = text.replace(/[^0-9]/g, '');
                    field.onChange(numbersOnly);
                  }}
                  placeholder="Card number (16 digits)"
                  placeholderTextColor="#CACACA"
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={16}
                />
              )}
            />
            {errors.destinationWalletCardNumber && (
              <Text style={styles.errorText}>
                {errors.destinationWalletCardNumber.message}
              </Text>
            )}
            
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  onChangeText={(text) => {
                    const numbersOnly = text.replace(/[^0-9.]/g, '');
                    field.onChange(numbersOnly);
                  }}
                  placeholder="Amount"
                  placeholderTextColor="#CACACA"
                  style={styles.input}
                  keyboardType="decimal-pad"
                />
              )}
            />
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount.message}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.buttonDisabled]}
              disabled={!isFormValid}
              onPress={handleSubmit(handlerTransfer)}
            >
              <Text style={styles.buttonText}>
                {isPending ? (
                  <MaterialIndicator size={25} color="#fff" />
                ) : loading ? (
                  "Loading..."
                ) : (
                  "Confirm"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransferForm;