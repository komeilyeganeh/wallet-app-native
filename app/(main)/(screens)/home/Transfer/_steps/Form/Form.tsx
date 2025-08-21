import SelectBox from "@/components/input/selectBox/SelectBox";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import * as yup from "yup";
import styles from "./Form.styles";

// form validation
const schema = yup.object().shape({
  card: yup.string().required(),
  name: yup.string().required(),
  cardNumber: yup.string().required(),
  amount: yup.string().required(),
  content: yup.string().required(),
});

const data = [
  { key: "190089885456", label: "1900 8988 5456" },
  { key: "190081125222", label: "1900 8112 5222" },
  { key: "441100001234", label: "4411 0000 1234" },
  { key: "190089885400", label: "1900 8988 5456" },
  { key: "190089885450", label: "1900 8988 5450" },
];

const TransferForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      card: "",
      name: "",
      cardNumber: "",
      amount: "",
      content: "",
    },
  });
  // **** jsx ****
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
          </View>
          <View style={styles.form}>
            <Controller
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
            />
            <Controller
              name="cardNumber"
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
            <Controller
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
            />
            <View
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
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransferForm;
