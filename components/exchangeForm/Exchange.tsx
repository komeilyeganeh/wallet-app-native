import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import SelectBox from "../input/selectBox";
import styles from "./Exchange.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetCurrency } from "./api/useExchange";

const schema = yup.object().shape({
  fromCurrencyId: yup.number().required(),
  toCurrencyId: yup.number().required(),
  rate: yup.number().required(),
  lastUpdatedAt: yup.string().required(),
});


const ExchangeForm: FC = () => {
  const [currency, setCurrency] = useState({
    from: "",
    to: ""
  })
  const [currenciesData, setCurrenciesData] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fromCurrencyId: 0,
      toCurrencyId: 0,
      rate: 0,
      lastUpdatedAt: "",
    },
  });

  // **** get currencies ****
  // const { data: currencies } = useGetCurrency();

  const isFormValid = isValid;

  // useEffect(() => {
  //   if (currencies) {
  //     const options = currencies?.data?.data?.map((currency: any) => ({
  //       key: currency?.id,
  //       label: `${currency?.code} (${currency?.name})`,
  //     }));
  //     setCurrenciesData(options);
  //   }
  // }, [currencies]);

  // **** exchange rate handler ****
  const exchangeRateHandler = (data: any) => {
    const params = { ...data };
    params.lastUpdatedAt = Date.now();
    console.log(params);
    
    // exchangeRateCreate(data, {
    //   onSuccess: (res) => {
    //     console.log(res);
    //     reset();
    //   }
    // })
  }

  // **** return jsx ****
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputs}>
        <View>
          <Text style={styles.label}>From</Text>
          <Controller
            name="fromCurrencyId"
            control={control}
            render={({ field }) => (
              <SelectBox
                {...field}
                data={currenciesData}
                onChange={(e) => {
                  setCurrency(prev => ({ ...prev, from: e.label }));
                  field.onChange(+e.key);
                }}
                label="Choose account/ card"
                value={currency.from}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>To</Text>
          <Controller
            name="toCurrencyId"
            control={control}
            render={({ field }) => (
              <SelectBox
                {...field}
                data={currenciesData}
                onChange={(e) => {
                  setCurrency(prev => ({ ...prev, to: e.label }));
                  field.onChange(+e.key);
                }}
                label="Choose account/ card"
                value={currency.to}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Rate</Text>
          <Controller
            name="rate"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={(e) => field.onChange(+e)}
                placeholder="Rate"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(exchangeRateHandler)}
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Exchange</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExchangeForm;
