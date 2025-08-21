import { ResetPasswordFormType, ForgotFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./ResetPassForm.styles";

// form validation
const schema = yup.object().shape({
  password: yup.string().required("password field is required."),
  confirmPassword: yup.string().required(),
});

const ResetPasswordForm: FC = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  //   **** jsx ****
  return (
    <View style={styles.formContainer}>
      <Text style={styles.subTitle}>Type your new password</Text>
      <View>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              placeholder="New Password"
              placeholderTextColor="#CACACA"
              style={styles.input}
            />
          )}
        />
        {errors && (
          <Text style={styles.errorMessage}>{errors.password?.message}</Text>
        )}
      </View>
      <Text style={styles.subTitle}>Type your new password</Text>
      <View>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              placeholder="Repeat New Password"
              placeholderTextColor="#CACACA"
              style={styles.input}
            />
          )}
        />
        {errors && (
          <Text style={styles.errorMessage}>
            {errors.confirmPassword?.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => {}}
        style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
        disabled={!isValid}
      >
        <Text style={styles.submitButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordForm;
