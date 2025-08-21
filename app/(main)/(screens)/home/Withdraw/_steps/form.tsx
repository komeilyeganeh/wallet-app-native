import SelectBox from "@/components/input/selectBox/SelectBox";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";

// form validation
const schema = yup.object().shape({
  card: yup.string().required(),
  phoneNumber: yup.string().required(),
  amount: yup.string().required(),
});

const data = [
  { key: "190089885456", label: "1900 8988 5456" },
  { key: "190081125222", label: "1900 8112 5222" },
  { key: "441100001234", label: "4411 0000 1234" },
  { key: "190089885400", label: "1900 8988 5456" },
  { key: "190089885450", label: "1900 8988 5450" },
];

const WithdrawForm = ({ setStep }: { setStep: () => void }) => {
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
        <View>
          <Text style={styles.label}>Choose account/ card</Text>
          <Controller
            name="card"
            control={control}
            render={({ field }) => (
              <SelectBox
                {...field}
                data={data}
                onChange={(e) => {
                  setSelectedItem(e.label);
                  field.onChange(e.key)
                }}
                label="Choose account/ card"
                value={selectedItem}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Phone number</Text>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Phone number"
                placeholderTextColor="#CACACA"
                secureTextEntry
                style={styles.input}
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
                secureTextEntry
                style={styles.input}
              />
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        disabled={!isValid}
        onPress={setStep}
      >
        <Text style={styles.buttonText}>Verify</Text>
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
