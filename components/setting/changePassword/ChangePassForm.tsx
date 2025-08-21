import { ChangePasswordFormType, ForgotFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./ChangePassForm.styles";

// form validation
const schema = yup.object().shape({
  recentPassword: yup.string().required("recent password is required."),
  newPassword: yup
    .string()
    .required("new password is required."),
    confirmPassword: yup.string().required("confirm password in required.")
});

const ChangePasswordForm: FC = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      recentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  //   **** jsx ****
  return (
    <View style={styles.formContainer}>
      <Text style={styles.subTitle}>Recent password</Text>
      <View>
        <Controller
          name="recentPassword"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              placeholder="Recent Password"
              placeholderTextColor="#CACACA"
              style={styles.input}
            />
          )}
        />
        {errors && (
          <Text style={styles.errorMessage}>{errors.recentPassword?.message}</Text>
        )}
      </View>
      <Text style={styles.subTitle}>New password</Text>
      <View>
        <Controller
          name="newPassword"
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
          <Text style={styles.errorMessage}>{errors.newPassword?.message}</Text>
        )}
      </View>
      <Text style={styles.subTitle}>Confirm password</Text>
      <View>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              placeholder="Confirm New Password"
              placeholderTextColor="#CACACA"
              style={styles.input}
            />
          )}
        />
        {errors && (
          <Text style={styles.errorMessage}>{errors.confirmPassword?.message}</Text>
        )}
      </View>
      
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
        disabled={!isValid}
      >
        <Text style={styles.submitButtonText}>Change password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordForm;
