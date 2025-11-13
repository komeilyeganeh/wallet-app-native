import SelectBox from "@/components/input/selectBox/SelectBox";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./Form.styles";
import { useGetCards } from "../../../AccountAndCard/_tabs/Card/api/useCards";
import { cardNumberSpace } from "@/lib/cardNumberSpace";
import { useTransferAmount } from "./api/useTransfer";
import { useToast } from "react-native-toast-notifications";
import { MaterialIndicator } from "react-native-indicators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clientAxios } from "@/lib/http";
import { useRouter } from "expo-router";

// form validation
const schema = yup.object().shape({
  sourceWalletId: yup.string().required("Please select the source wallet"),
  destinationWalletCardNumber: yup
    .string()
    .required("Destination card number is required")
    .min(16, "Card number must be 16 digits"),
  amount: yup
    .string()
    .required("Amount is required")
    .test("is-positive", "Amount must be greater than zero", (value) => {
      return Number(value) > 0;
    }),
});

async function getWallets() {
  const userId = await AsyncStorage.getItem("userId");
  try {
    const res = await clientAxios.get(`/User/GetById/${JSON.parse(userId!)}`);
    return res?.data?.data?.wallets;
  } catch (err) {
    console.log(err);
  }
}

const TransferForm = () => {
  // const [isChecked, setIsChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cardOptions, setCardOptions] = useState([]);
  // const { data: cards } = useGetCards();
  const { mutate: mutateTransfer, isPending } = useTransferAmount();
  const toast = useToast();
  const router = useRouter();
  // useEffect(() => {
  //   if (cards?.data) {
  //     const options = cards?.data?.data?.map((card: any) => ({ key: card?.cardToken ,label: `${cardNumberSpace(card?.cardToken)} (${card?.bankName})` }))
  //     setCardOptions(options);
  //   }
  // }, [cards]);
  useEffect(() => {
    getWallets().then((res) => {
      const options = res?.map((wallet: any) => ({
        key: wallet?.id,
        label: `${cardNumberSpace(wallet?.cardNumber)} (${wallet?.bankName})`,
      }));
      setCardOptions(options);
    });
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sourceWalletId: "",
      destinationWalletCardNumber: "",
      amount: "",
    },
  });
  const isFormValid = isValid && !isPending;
  const handlerTransfer = (formData: any) => {
    const params = {
      ...formData,
      sourceWalletId: Number(formData?.sourceWalletId),
      amount: Number(formData?.amount),
    };
    console.log(params);

    mutateTransfer(params, {
      onSuccess: () => {
        toast.show("Transfer Successfully.", { type: "success" });
        router.replace("/(main)/(screens)/home");
      },
      onError: (error) => {
        toast.show("Error performing transfer", { type: "danger" });
        console.error("Transfer error:", error);
      },
    });
  };
  // **** jsx ****
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <View style={styles.inputs}>
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
                />
              )}
            />
            {errors.sourceWalletId && (
              <Text style={styles.errorText}>
                {errors.sourceWalletId.message}
              </Text>
            )}
          </View>
          {/* <View>
            <Text style={styles.label}>Choose transaction</Text>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 12 }}
              >
                <TouchableOpacity
                  style={[
                    styles.transactionItem,
                    styles.transactionItemSelected,
                  ]}
                >
                  <Entypo name="home" size={34} color="#fff" />
                  <Text style={styles.transactionItemTitle}>
                    Transfer via card number
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.transactionItem}>
                  <FontAwesome5 name="user-alt" size={34} color="#fff" />
                  <Text style={styles.transactionItemTitle}>
                    Tràner via the same bank
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.transactionItem}>
                  <Entypo name="home" size={34} color="#fff" />
                  <Text style={styles.transactionItemTitle}>
                    Transfer via card number
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
          <View>
            <View style={styles.directorTitle}>
              <Text style={styles.label}>Directory</Text>
              <Text style={styles.subTitle}>Find beneficiary </Text>
            </View>
            <View>
              <ScrollView
                style={styles.directorContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity style={styles.directorItem}>
                  <AntDesign name="pluscircle" size={60} color="#F2F1F9" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.directorItem, styles.itemSelected]}
                >
                  <Image
                    source={require("../../../../../../../assets/images/girl.png")}
                  />
                  <Text style={[styles.directorName, styles.valueSelected]}>
                    Amanda
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.directorItem}>
                  <Image
                    source={require("../../../../../../../assets/images/girl.png")}
                  />
                  <Text style={styles.directorName}>Lana</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View> */}
          <Text style={styles.label}>Destination info</Text>
          <View style={styles.form}>
            {/* <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  onChangeText={field.onChange}
                  placeholder="Name"
                  placeholderTextColor="#CACACA"
                  style={styles.input}
                />
              )}
            /> */}
            <Controller
              name="destinationWalletCardNumber"
              control={control}
              render={({ field }) => (
                <TextInput
                  onChangeText={field.onChange}
                  placeholder="Card number"
                  placeholderTextColor="#CACACA"
                  style={styles.input}
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
                  onChangeText={field.onChange}
                  placeholder="Amount"
                  placeholderTextColor="#CACACA"
                  style={styles.input}
                />
              )}
            />
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount.message}</Text>
            )}
            {/* <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextInput
                  onChangeText={field.onChange}
                  placeholder="Content"
                  placeholderTextColor="#CACACA"
                  style={styles.input}
                />
              )}
            /> */}
            {/* <View
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
              }}
            >
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? "#3629B7" : ""}
                style={styles.checkBox}
              />
              <Text style={{ fontSize: 14, color: "#989898" }}>
                Save to directory of beneficiary
              </Text>
            </View> */}
            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.buttonDisabled]}
              disabled={!isFormValid}
              onPress={handleSubmit(handlerTransfer)}
            >
              <Text style={styles.buttonText}>
                {isPending ? (
                  <MaterialIndicator size={25} color="#fff" />
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
