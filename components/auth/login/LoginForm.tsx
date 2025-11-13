import { LoginFormType } from "@/types/authForm";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
import * as LocalAuthentication from "expo-local-authentication";
import styles from "./LoginForm.styles";
import { useLogin, useLoginReq } from "./api/useLogin";
import { MaterialIndicator } from "react-native-indicators";
import { useToast } from "react-native-toast-notifications";
import { tokenStorage } from "@/lib/storage/tokenStorage";

// form validation
const schema = yup.object().shape({
  username: yup
    .string()
    // .matches(/^[0-9]{11}$/, "phone number is invalid")
    .required("user name field is required."),
  password: yup
    .string()
    // .min(6, "password must be at least 6 characters.")
    .required("password field is required."),
  remember: yup.boolean().required(),
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
  const { mutate: loginReq, isPending: isPendingLoginReq } = useLoginReq();
  const { mutate: login, isPending: isPendingLogin } = useLogin();
  const router = useRouter();
  const toast = useToast();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  });

  const isFormValid = isValid && !isPendingLoginReq && !isPendingLogin;

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

  //   **** functions ****
  const onSubmit = async (data: any) => {
    loginReq(data, {
      onSuccess: async (res) => {
        if (res?.data?.data?.token) {
          await tokenStorage.setToken(res?.data?.data?.token);
        }
        login(
          {
            token: res?.data?.data?.token,
            otp: "123456",
          },
          {
            onSuccess: async (res) => {
              toast.show("You have successfully logged in to your account.", {
                type: "success",
              });
              if (res.data) {
                const userDecode = jwtDecode(res?.data?.data?.token);
                await AsyncStorage.setItem(
                  "userId",
                  JSON.stringify(userDecode?.sub)
                );
                await AsyncStorage.setItem(
                  "userData",
                  JSON.stringify(userDecode)
                );
              }
              
              router.replace("/(main)/(tabs)/home");
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
          name="username"
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
          <Text style={styles.errorMessage}>{errors.username?.message}</Text>
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
        style={[
          styles.submitButton,
          !isFormValid && styles.submitButtonDisabled,
        ]}
        disabled={!isFormValid}
      >
        <Text style={styles.submitButtonText}>
          {isPendingLoginReq || isPendingLogin ? (
            <MaterialIndicator size={25} />
          ) : (
            "Sign in"
          )}
        </Text>
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
        Don&apos;t have an account?{" "}
        <Link href="/(auth)/register" style={styles.signupPageLink}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default LoginForm;
