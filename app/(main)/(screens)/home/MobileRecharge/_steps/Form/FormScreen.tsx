import SelectBox from "@/components/input/selectBox/SelectBox";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./Form.styles";

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

const PrepaidFormScreen = () => {
  const [director, setDirector] = useState(null);
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
                  field.onChange(e.key);
                }}
                label="Choose account/ card"
                value={selectedItem}
              />
            )}
          />
        </View>
        <View>
          <View style={styles.directorTitle}>
            <Text style={styles.label}>Directory</Text>
            <Text style={styles.subTitle}>Find beneficiary </Text>
          </View>
          <View style={styles.directorContainer}>
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
          </View>
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
          <View style={styles.directorContainer}>
            <TouchableOpacity style={styles.amountItem}>
              <Text style={styles.amountValue}>$10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.amountItem, styles.itemSelected]}>
              <Text style={[styles.amountValue, styles.valueSelected]}>$20</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.amountItem}>
              <Text style={styles.amountValue}>$30</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};



export default PrepaidFormScreen;
