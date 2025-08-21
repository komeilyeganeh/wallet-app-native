import { LoginFormType } from "@/types/authForm";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect } from "expo-router";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as yup from "yup";
import * as LocalAuthentication from "expo-local-authentication";
import styles from "./LoginForm.styles";

// form validation
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{11}$/, "phone number is invalid")
    .required("phone number field is required."),
  password: yup
    .string()
    .min(6, "password must be at least 6 characters.")
    .required("password field is required."),
});

type BiometricType = "face" | "fingerprint" | "iris" | "none";
type AuthResult = {
  success: boolean;
  error?: string;
};

const LoginForm: FC = () => {
  const [isBiometricAvailable, setIsBiometricAvailable] =
    useState<boolean>(false);
  const [biometricType, setBiometricType] = useState<BiometricType>("none");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  const checkBiometricSupport = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);
      if (compatible) {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setIsEnrolled(enrolled);

        const supportedTypes =
          await LocalAuthentication.supportedAuthenticationTypesAsync();

        if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
          )
        ) {
          setBiometricType("face");
        } else if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FINGERPRINT
          )
        ) {
          setBiometricType("fingerprint");
        } else if (
          supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS)
        ) {
          setBiometricType("iris");
        }
      }
    } catch (error) {
      console.error("Error checking biometric support:", error);
      Alert.alert("Error", "There was a problem checking biometric support.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkBiometricSupport();
  }, [checkBiometricSupport]);

  const authenticate = useCallback(async (): Promise<AuthResult> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Please confirm your identity.",
        cancelLabel: "Cancel",
        fallbackLabel: "Use a password",
        disableDeviceFallback: false,
      });

      if (result.success) {
        return { success: true };
      } else {
        return {
          success: false,
          error:
            result.error === "user_cancel"
              ? "Authentication canceled."
              : "Authentication failed.",
        };
      }
    } catch (error) {
      console.error("Authentication error", error);
      return {
        success: false,
        error: "There was a problem with authentication.",
      };
    }
  }, []);

  const handleAuthentication = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    const result = await authenticate();

    if (result.success) {
      Alert.alert("Success", "Authentication was successful.");
    } else {
      Alert.alert("Error", result.error || "Authentication failed.");
    }

    setIsLoading(false);
  }, [authenticate]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
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
        <Link href="/(auth)/forgotPassword" style={styles.forgotPassword}>
          Forgot your password ?
        </Link>
        {errors && (
          <Text style={styles.errorMessage}>{errors.password?.message}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
        disabled={!isValid}
      >
        <Text style={styles.submitButtonText}>Sign in</Text>
      </TouchableOpacity>
      <View style={styles.biometric}>
        <TouchableOpacity
          style={styles.biometricButton}
          onPress={handleAuthentication}
        >
          <Ionicons name="finger-print" size={64} color="#3629B7" />
        </TouchableOpacity>
      </View>
      <Text style={styles.haveAccountText}>
        Don't have an account?{" "}
        <Link href="/(auth)/register" style={styles.signupPageLink}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default LoginForm;
