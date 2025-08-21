import { ForgotCodeFormType } from "@/types/authForm";
import { yupResolver } from "@hookform/resolvers/yup";
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

// form validation
const schema = yup.object().shape({
  code: yup
    .string()
    .length(4, "code must be at length 4 characters.")
    .required(),
});

const ForgotCodeForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotCodeFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  //   **** functions ****
  // const onSubmit = (data: any) => {
  //   router.push("/(auth)/resetPassword");
  // };
  //   **** jsx ****
  return (
    <View style={styles.formContainer}>
      <Text style={styles.subTitle}>Type a code</Text>
      <View style={styles.inputButtonGroup}>
        <View style={{ flex: 1 }}>
          <Controller
            name="code"
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
            <Text style={styles.errorMessage}>{errors.code?.message}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.resendButton}
        >
          <Text style={styles.submitButtonText}>Resend</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.subTitle_two}>
          We texted you a code to verify your phone number
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#281C9D" }}>
          (+84) 0398829xxx
        </Text>
      </View>
      <Text style={[styles.subTitle_two, { marginTop: 9.6 }]}>
        This code will expired 10 minutes after this message. If you don't get a
        message.
      </Text>
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

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 31,
  },
  inputButtonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 13,
  },
  subTitle: {
    fontSize: 12,
    color: "#989898",
    marginBottom: 15.8,
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
    marginTop: 32
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
