import { ChangePasswordFormType, ForgotFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./ChangePassForm.styles";
import { useChangePassword } from "@/services/settings/changePassword/hooks";
import { useToast } from "react-native-toast-notifications";

// form validation
const schema = yup.object().shape({
  oldPassword: yup.string().required("recent password is required."),
  newPassword: yup.string().required("new password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Must match 'New Paassword' field value")
    .required("confirm password in required."),
});

const ChangePasswordForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { mutate: mutateChangePassword, isPending } = useChangePassword();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordFormType) => {
    mutateChangePassword(data, {
      onSuccess: () => {
        toast.show("Password changed successfully.", { type: "success" });
        router.back();
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          error?.message ||
          "Change Password failed. Please try again.";

        toast.show(errorMessage, {
          type: "danger",
        });
      },
    });
  };
  //   **** jsx ****
  return (
    <View style={styles.formContainer}>
      <Text style={styles.subTitle}>Recent password</Text>
      <View>
        <Controller
          name="oldPassword"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              placeholder="Recent Password"
              secureTextEntry
              placeholderTextColor="#CACACA"
              style={styles.input}
            />
          )}
        />
        {errors && (
          <Text style={styles.errorMessage}>{errors.oldPassword?.message}</Text>
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
              secureTextEntry
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
              secureTextEntry
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

export default ChangePasswordForm;
