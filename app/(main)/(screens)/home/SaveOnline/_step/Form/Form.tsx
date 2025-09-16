import { lazy, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./Form.styles";

const HeaderWrapper = lazy(() => import("@/components/headerWrapper/HeaderWrapper"))
const SelectBox = lazy(() => import("@/components/input/selectBox/SelectBox"))

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

const AddForm = () => {
  const { width } = Dimensions.get("window");
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
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Add" />
        <View style={styles.content}>
          <Image
            source={require("../../../../../../../assets/images/add-save-online.webp")}
            style={{ width: width - 40, height: 220 }}
            resizeMode="contain"
          />
          <View style={styles.formContainer}>
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
                        field.onChange(e.key);
                      }}
                      label="Choose account/ card"
                      value={selectedItem}
                    />
                  )}
                />
              </View>
              <View>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      onChangeText={field.onChange}
                      placeholder="Choose time deposit"
                      placeholderTextColor="#CACACA"
                      style={styles.input}
                    />
                  )}
                />
              </View>
              <View>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      onChangeText={field.onChange}
                      placeholder="Amount (At least $1000)"
                      placeholderTextColor="#CACACA"
                      style={styles.input}
                    />
                  )}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.button, !isValid && styles.buttonDisabled]}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddForm;
