import { ForgotFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import * as yup from "yup";
import styles from "./Form.styles";
import {
  useForgotPasswordRequest,
} from "@/services/auth/forgotPassword/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

// form validation - فقط username
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username field is required.")
    .min(2, "Username must be at least 3 characters")
    .max(50, "Username is too long"),
});

const ForgotForm: FC<{ onChangeStep: (step: number) => void }> = ({
  onChangeStep,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: mutateForgotPasswordReq } = useForgotPasswordRequest();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  });

  //   **** functions ****
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    mutateForgotPasswordReq(data, {
      onSuccess: async (res) => {
        const token = await res?.data?.data?.token;
        AsyncStorage.setItem("resetPasswordToken", token);
        onChangeStep(2);
      },
    });
  };

  //   **** jsx ****
  return (
    <View style={styles.formContainer}>
      <Text style={styles.subTitle}>Enter your username</Text>

      <View>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              value={field.value}
              placeholder="Username"
              placeholderTextColor="#CACACA"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSubmitting}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorMessage}>{errors.username.message}</Text>
        )}
      </View>

      <Text style={styles.helpText}>
        We'll send a recovery code to the email associated with this username
      </Text>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.submitButton,
          (!isValid || isSubmitting) && styles.submitButtonDisabled,
        ]}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Sending..." : "Send Recovery Code"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => router.back()}
        disabled={isSubmitting}
      >
        <Text
          style={[styles.helpText, { textAlign: "center", color: "#3629B7" }]}
        >
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotForm;
