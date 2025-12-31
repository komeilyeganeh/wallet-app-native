import { useResetPassword } from "@/services/auth/forgotPassword/hooks";
import { ForgotCodeFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as yup from "yup";

// form validation
const schema = yup.object().shape({
  otp: yup.string().required(),
  newPassword: yup
    .string()
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Must match 'New Paassword' field value")
    .required(),
});

const ForgotCodeForm: FC = () => {
  const { mutate: mutateResetPassword, isPending } = useResetPassword();
  const router = useRouter();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotCodeFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  //   **** functions ****
  const onSubmit = async (data: any) => {
    const token = await AsyncStorage.getItem("resetPasswordToken");
    const params = {
      ...data,
      token,
      otp: "123456",
    };
    mutateResetPassword(params, {
      onSuccess: () => {
        toast.show("Password changed successfully.", { type: "success" });
        router.push("/(auth)/login");
      },
      onError: (error: any) => {
        toast.show(error?.response?.data?.errors?.NewPassword[0], {
          type: "danger",
        });
        console.log(error?.response?.data?.errors);
      },
    });
  };
  //   **** jsx ****
  return (
    <View style={styles.formContainer}>
      <Text style={styles.subTitle}>Type a code</Text>
      <View style={styles.inputButtonGroup}>
        <View style={{ flex: 1 }}>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                placeholder="Code"
                placeholderTextColor="#CACACA"
                style={styles.input}
              />
            )}
          />
          {errors && (
            <Text style={styles.errorMessage}>{errors.otp?.message}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.resendButton}>
          <Text style={styles.submitButtonText}>Resend</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputsWrapper}>
        <View>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                value={field.value}
                placeholder="New Password"
                placeholderTextColor="#CACACA"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                editable={!isPending}
              />
            )}
          />
          {errors.newPassword && (
            <Text style={styles.errorMessage}>
              {errors.newPassword.message}
            </Text>
          )}
        </View>
        <View>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                onChangeText={field.onChange}
                value={field.value}
                placeholder="Confirm Password"
                placeholderTextColor="#CACACA"
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry
                autoCorrect={false}
                editable={!isPending}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorMessage}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.submitButton,
          (!isValid || isPending) && styles.submitButtonDisabled,
        ]}
        disabled={!isValid || isPending}
      >
        {isPending ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Change password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 21,
  },
  inputsWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
  },
  inputButtonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  subTitle: {
    fontSize: 12,
    color: "#989898",
    marginBottom: 8,
  },
  subTitle_two: {
    color: "#898989",
    fontSize: 14,
  },
  helpText: {
    fontSize: 14,
    color: "#343434",
  },
  input: {
    borderRadius: 14.5,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    padding: 11.5,
    fontSize: 14,
    color: "#333",
  },
  resendButton: {
    backgroundColor: "#3629B7",
    width: 100,
    height: 44,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#3629B7",
    height: 44,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  submitButtonDisabled: {
    backgroundColor: "#F2F1F9",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginVertical: 4,
  },
});

export default ForgotCodeForm;
