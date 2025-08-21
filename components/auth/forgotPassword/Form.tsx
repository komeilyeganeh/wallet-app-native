import { ForgotFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import * as yup from "yup";
import styles from "./Form.styles";

// form validation
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{11}$/, "phone number is invalid")
    .required("phone number field is required."),
});

const ForgotForm: FC<{ onChangeStep: (step: number) => void }> = ({
  onChangeStep,
}) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  //   **** functions ****
  const onSubmit = (data: any) => {
    onChangeStep(2);
  };
  //   **** jsx ****
  return (
    <View style={styles.formContainer}>
      <Text style={styles.subTitle}>Type your phone number</Text>
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
      <Text style={styles.helpText}>
        We texted you a code to verify your phone number
      </Text>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
        disabled={!isValid}
      >
        <Text style={styles.submitButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotForm;
