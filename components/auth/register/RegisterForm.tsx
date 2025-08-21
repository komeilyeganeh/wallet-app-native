import { RegisterFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckBox from "expo-checkbox";
import { Link } from "expo-router";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./RegisterForm.styles";

// form validation
const schema = yup.object().shape({
  name: yup.string().required("name field is required."),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{11}$/, "phone number is invalid")
    .required("phone number field is required."),
  password: yup
    .string()
    .min(6, "password must be at least 6 characters.")
    .required("password field is required."),
});

const RegisterForm: FC = () => {
  // **** states ****
  const [isChecked, setIsChecked] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
    },
  });

  //   **** functions ****
  const onSubmit = (data: any) => {
    console.log(data);
  };
  //   **** jsx ****
  return (
    <View style={styles.formContainer}>
      <View>
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
        {errors && (
          <Text style={styles.errorMessage}>{errors.name?.message}</Text>
        )}
      </View>
      <View>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              placeholder="Phone Number"
              placeholderTextColor="#CACACA"
              style={styles.input}
            />
          )}
        />
        {errors && (
          <Text style={styles.errorMessage}>{errors.phoneNumber?.message}</Text>
        )}
      </View>
      <View>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              placeholder="Password"
              placeholderTextColor="#CACACA"
              secureTextEntry
              style={styles.input}
            />
          )}
        />
        {errors && (
          <Text style={styles.errorMessage}>{errors.password?.message}</Text>
        )}
      </View>
      <View style={styles.section}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? "#3629B7" : ""}
          style={styles.checkBox}
        />
        <Text>
          By creating an account your aggree to our{" "}
          <Link href=".." style={styles.link}>
            Term and Condtions
          </Link>
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.submitButton,
          !isValid && !isChecked && styles.submitButtonDisabled,
        ]}
        disabled={!isValid && !isChecked}
      >
        <Text style={styles.submitButtonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.haveAccountText}>
        Have an account?{" "}
        <Link href="/(auth)/login" style={styles.loginPageLink}>
          Sign In
        </Link>
      </Text>
    </View>
  );
};

export default RegisterForm;
