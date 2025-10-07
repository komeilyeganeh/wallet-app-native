import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./NewCardForm.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddCard } from "./api/useNewCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const schema = yup.object().shape({
  userId: yup.number().required(),
  cardToken: yup.string().required(),
  lastFourDigits: yup.string().required(),
  cardBrand: yup.string().required(),
  bankName: yup.string().required(),
  isDefault: yup.boolean().optional(),
  addedAt: yup.date().optional(),
});

const NewCardForm: FC<{
  setIsShowForm: (status: boolean) => void;
  refetch: any;
}> = ({ setIsShowForm, refetch }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: 0,
      cardToken: "",
      lastFourDigits: "",
      cardBrand: "",
      bankName: "",
      isDefault: true,
      addedAt: new Date(),
    },
  });

  const { mutate: mutateNewCard, isPending: newCardPending } = useAddCard();

  const onSubmit = async (formData: any) => {
    const params = { ...formData };
    const id = await AsyncStorage.getItem("userId");
    params.userId = +JSON.parse(id!);
    mutateNewCard(params, {
      onSuccess: (res) => {
        if (res?.data) {
          setIsShowForm(false);
          refetch();
        }
      },
      onError: (err) => {
        console.log(err.message);
      },
    });
  };
  // **** return jsx ****
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputs}>
        <View>
          <Controller
            name="cardToken"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Card Number"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
        </View>
        <View>
          <Controller
            name="lastFourDigits"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Last Four Digits"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
        </View>
        <View>
          <Controller
            name="cardBrand"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Card Brand"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
        </View>
        <View>
          <Controller
            name="bankName"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Bank Name"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          (!isValid || newCardPending) && styles.buttonDisabled,
        ]}
        disabled={!isValid || newCardPending}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NewCardForm;
