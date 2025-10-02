import SelectBox from "@/components/input/selectBox";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./Form.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// form validation
const schema = yup.object().shape({
  card: yup.string().required(),
  billCode: yup.string().required()
});

const data = [
  { key: "190089885456", label: "1900 8988 5456" },
  { key: "190081125222", label: "1900 8112 5222" },
  { key: "441100001234", label: "4411 0000 1234" },
  { key: "190089885400", label: "1900 8988 5456" },
  { key: "190089885450", label: "1900 8988 5450" },
];

const InternetBillForm: FC = () => {
     const [selectedItem, setSelectedItem] = useState(null);
      const {
        control,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          card: "",
          billCode: ""
        },
      });
    // **** return jsx ****
    return <View style={styles.formContainer}>
      <View style={styles.inputs}>
        <View>
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
          <Text style={styles.label}>Type internet bill code</Text>
          <Controller
            name="billCode"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Bill Code"
                placeholderTextColor="#CACACA"
                secureTextEntry
                style={styles.input}
              />
            )}
          />
        </View>
      </View>
      <Text style={{ fontSize: 14, color: "#898989" }}>Please enter the correct bill code to check information.</Text>
      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Check</Text>
      </TouchableOpacity>
    </View>
}
export default InternetBillForm;