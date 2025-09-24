import { RegisterFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckBox from "expo-checkbox";
import { Link, useNavigation, useRouter } from "expo-router";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import styles from "./RegisterForm.styles";
import { useSignUpFirst, useSignUpLast } from "./api/useSignup";
import { MaterialIndicator } from "react-native-indicators";
import { useToast } from "react-native-toast-notifications";
import { tokenStorage } from "@/lib/storage/tokenStorage";

// form validation
const schema = yup.object().shape({
  name: yup.string().required("name field is required."),
  userName: yup
    .string()
    // .matches(/^[0-9]{11}$/, "phone number is invalid")
    .required("user name field is required."),
  password: yup
    .string()
    .min(6, "password must be at least 6 characters.")
    .required("password field is required."),
});

const RegisterForm: FC = () => {
  // **** states ****
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const toast = useToast();
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
      email: "-",
      family: "-",
      userName: "-",
      displayCurrencyCode: "-",
    },
  });
  const { mutate: signUpFirst, isPending } = useSignUpFirst();
  const { mutate: signUpLast } = useSignUpLast();
  const isFormValid = isValid && isChecked && !isPending;

  //   **** functions ****
  const onSubmit = (data: any) => {
    signUpFirst(data, {
      onSuccess: async (res) => {
        if (res?.data?.token) {
          try {
            await tokenStorage.setToken(res?.data?.token);
          } catch (err) {
            toast.show("Error saving session", { type: "danger" });
            return;
          }
        }
        signUpLast(
          {
            token: res?.data?.token,
            otp: "123456",
          },
          {
            onSuccess: () => {
              toast.show("Registration was successful.", {
                type: "success",
              });
              router.replace("/(auth)/login");
            },
            onError: (error: any) => {
              const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error?.message ||
                error?.message ||
                "Registration failed. Please try again.";

              toast.show(errorMessage, {
                type: "danger",
              });
            },
          }
        );
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          error?.message ||
          "Registration failed. Please try again.";

        toast.show(errorMessage, {
          type: "danger",
        });
      },
    });
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
          name="userName"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              placeholder="User Name"
              placeholderTextColor="#CACACA"
              style={styles.input}
            />
          )}
        />
        {errors && (
          <Text style={styles.errorMessage}>{errors.userName?.message}</Text>
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
          !isFormValid && styles.submitButtonDisabled,
        ]}
        disabled={!isFormValid}
      >
        <Text style={styles.submitButtonText}>
          {isPending ? <MaterialIndicator size={25} /> : "Sign up"}
        </Text>
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
