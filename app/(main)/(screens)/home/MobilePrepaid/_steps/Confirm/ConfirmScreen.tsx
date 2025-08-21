import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./Confirm.styles";

// form validation
const schema = yup.object().shape({
  card: yup.string().required(),
  phoneNumber: yup.string().required(),
  amount: yup.string().required(),
});

const ConfirmPrepaidScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      card: "",
      phoneNumber: "",
      amount: "",
    },
  });
  // **** jsx ****
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputs}>
        <Text style={{ fontSize: 12, color: "#989898" }}>
          Confirm transaction information
        </Text>
        <View>
          <Text style={styles.label}>From</Text>
          <Controller
            name="card"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="From"
                placeholderTextColor="#CACACA"
                secureTextEntry
                style={styles.input}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>To</Text>
          <Controller
            name="card"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="To"
                placeholderTextColor="#CACACA"
                secureTextEntry
                style={styles.input}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Amount</Text>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Amount"
                placeholderTextColor="#CACACA"
                secureTextEntry
                style={styles.input}
              />
            )}
          />
        </View>
        <View style={styles.otpContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Get OTP to verify transaction</Text>
            <Controller
              name="phoneNumber"
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ConfirmPrepaidScreen;
