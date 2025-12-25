import { FC, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Modal,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { MaterialIndicator } from "react-native-indicators";
import { tokenStorage } from "@/lib/storage/tokenStorage";
import { jwtDecode } from "jwt-decode";
import styles from "./LoginWith2FA.styles";
import { useCompleteLoginWith2FA } from "@/services/auth/twoFactor/hooks";

// Validation schema
const verifyTwoFactorSchema: yup.ObjectSchema<VerifyTwoFactorFormData> = yup
  .object()
  .shape({
    code: yup
      .string()
      .matches(/^\d{6}$/, "Code must be 6 digits")
      .required("Verification code is required"),
    backupCode: yup.string().optional(),
  });

interface VerifyTwoFactorFormData {
  code: string;
  backupCode?: string;
}

interface RouteParams {
  loginToken?: string;
}

const LoginWith2FAScreen: FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams<any>();
  const toast = useToast();

  const loginToken = params.loginToken || "";
  const [isUsingBackupCode, setIsUsingBackupCode] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupCodeInput, setBackupCodeInput] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const { mutate: completeLoginWith2FA, isPending: isCompleteLogin2FA } =
    useCompleteLoginWith2FA();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<VerifyTwoFactorFormData>({
    resolver: yupResolver(verifyTwoFactorSchema),
    defaultValues: {
      code: "",
      backupCode: "",
    },
    mode: "onChange",
  });

  // Start animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleVerify = async (data: VerifyTwoFactorFormData) => {
    if (!loginToken) {
      toast.show("Session expired. Please login again.", {
        type: "danger",
      });
      router.replace("/(auth)/login");
      return;
    }
    const payload = {
      loginToken,
      code: data.code,
      backupCode: data.backupCode || "",
    };
    completeLoginWith2FA(payload, {
      onSuccess: async (response: any) => {
        setVerificationSuccess(true);
        const finalToken = response?.data?.data?.token || response?.data?.token;

        if (!finalToken) {
          toast.show("Authentication failed. No token received.", {
            type: "danger",
          });
          return;
        }

        await tokenStorage.setToken(finalToken);
        try {
          const userDecode = jwtDecode(finalToken);
          await AsyncStorage.setItem(
            "userId",
            JSON.stringify(userDecode?.sub || "")
          );
          await AsyncStorage.setItem("userData", JSON.stringify(userDecode));
        } catch (error) {
          console.error("Error saving user data:", error);
        }

        toast.show("Two-factor authentication verified successfully!", {
          type: "success",
        });
        setTimeout(() => {
          router.replace("/(main)/(tabs)/home");
        }, 1000);
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "login failed. Please try again.";
        toast.show(errorMessage, { type: "danger" });
      },
    });
  };
  const handleUseBackupCode = () => {
    setShowBackupModal(true);
    setBackupCodeInput("");
  };

  const submitBackupCode = () => {
    const trimmedCode = backupCodeInput.trim();
    if (!trimmedCode) {
      return;
    }
    setIsUsingBackupCode(true);
    setValue("backupCode", trimmedCode);
    setShowBackupModal(false);
    setBackupCodeInput("");

    toast.show("Backup code entered successfully", {
      type: "success",
    });

    Alert.alert(
      "Backup Code Entered",
      "Now enter the 6-digit code from your authenticator app.",
      [{ text: "OK" }]
    );
  };

  const cancelBackupCode = () => {
    setShowBackupModal(false);
    setBackupCodeInput("");
  };

  const handleBackToLogin = () => {
    router.replace("/(auth)/login");
  };

  // **** jsx ****
  return (
    <View style={styles.container}>
      {/* Backup Code Modal */}
      <Modal
        visible={showBackupModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelBackupCode}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Use Backup Code</Text>
                <Text style={styles.modalSubtitle}>
                  Enter one of your backup codes
                </Text>
              </View>

              {/* Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  value={backupCodeInput}
                  onChangeText={(text) => {
                    setBackupCodeInput(text);
                  }}
                  placeholder="Enter backup code"
                  placeholderTextColor="#999"
                  style={[styles.modalInput]}
                  autoFocus
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={12}
                  secureTextEntry
                  keyboardType="number-pad"
                />
              </View>

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={cancelBackupCode}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.submitButton,
                    !backupCodeInput.trim() && styles.submitButtonDisabled,
                  ]}
                  onPress={submitBackupCode}
                  disabled={!backupCodeInput.trim()}
                >
                  <Text style={styles.submitButtonText}>Use Backup Code</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <View style={styles.wrapper}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Success Animation */}
            {verificationSuccess && (
              <Animated.View
                style={[
                  styles.successContainer,
                  { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
              >
                <View style={styles.successIcon}>
                  <MaterialIcons name="verified" size={80} color="#4CAF50" />
                </View>
                <Text style={styles.successTitle}>Successfully Verified!</Text>
                <Text style={styles.successText}>
                  You will be redirected to your app.
                </Text>
              </Animated.View>
            )}

            {/* Verification Form */}
            {!verificationSuccess && (
              <Animated.View
                style={[
                  styles.formContainer,
                  { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
              >
                {/* Header */}
                <View style={styles.headerContainer}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="shield-checkmark"
                      size={40}
                      color="#3629B7"
                    />
                  </View>
                  <Text style={styles.title}>Two-Factor Authentication</Text>
                  <Text style={styles.subtitle}>
                    Enter the verification code from your authenticator app
                  </Text>
                </View>

                {/* Code Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    6-Digit Verification Code
                  </Text>

                  <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        value={field.value}
                        onChangeText={(text) => {
                          const numeric = text.replace(/[^0-9]/g, "");
                          field.onChange(numeric);
                          if (numeric.length === 6) {
                            trigger("code");
                          }
                        }}
                        placeholder="123456"
                        placeholderTextColor="#999"
                        style={[
                          styles.codeInput,
                          errors.code && styles.inputError,
                          isUsingBackupCode && styles.backupCodeInput,
                        ]}
                        keyboardType="number-pad"
                        maxLength={6}
                        editable={!isCompleteLogin2FA}
                        autoFocus
                        textAlign="center"
                      />
                    )}
                  />

                  {errors.code && (
                    <Text style={styles.errorText}>{errors.code.message}</Text>
                  )}
                </View>

                {/* Timer and Resend */}
                {/* <View style={styles.timerContainer}>
                  {countdown > 0 ? (
                    <>
                      <MaterialIcons name="timer" size={20} color="#FF9800" />
                      <Text style={styles.timerText}>
                        Resend available in {formatTime(countdown)}
                      </Text>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.resendButton}
                      onPress={handleResendCode}
                      disabled={isCompleteLogin2FA}
                    >
                      <Ionicons name="reload" size={20} color="#3629B7" />
                      <Text style={styles.resendText}>Resend Code</Text>
                    </TouchableOpacity>
                  )}
                </View> */}

                {/* Backup Code Option */}
                <TouchableOpacity
                  style={styles.backupOption}
                  onPress={handleUseBackupCode}
                  disabled={isCompleteLogin2FA || isUsingBackupCode}
                >
                  <MaterialIcons
                    name={isUsingBackupCode ? "lock" : "lock-open"}
                    size={20}
                    color={isUsingBackupCode ? "#4CAF50" : "#666"}
                  />
                  <Text
                    style={[
                      styles.backupOptionText,
                      isUsingBackupCode && styles.backupOptionActive,
                    ]}
                  >
                    {isUsingBackupCode
                      ? "Backup Code Entered"
                      : "Use Backup Code"}
                  </Text>
                </TouchableOpacity>

                {/* Backup Code Info */}
                {isUsingBackupCode && (
                  <View style={styles.backupInfo}>
                    <MaterialIcons
                      name="info-outline"
                      size={18}
                      color="#2196F3"
                    />
                    <Text style={styles.backupInfoText}>
                      Backup code is ready. Enter the 6-digit code from your
                      authenticator app.
                    </Text>
                  </View>
                )}

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    (!isValid || isCompleteLogin2FA) &&
                      styles.verifyButtonDisabled,
                  ]}
                  onPress={handleSubmit(handleVerify)}
                  disabled={!isValid || isCompleteLogin2FA}
                >
                  {isCompleteLogin2FA ? (
                    <MaterialIndicator size={25} color="#FFF" />
                  ) : (
                    <>
                      <Text style={styles.verifyButtonText}>
                        Verify & Continue
                      </Text>
                      <AntDesign name="arrowright" size={20} color="#FFF" />
                    </>
                  )}
                </TouchableOpacity>

                {/* Back to Login */}
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBackToLogin}
                  disabled={isCompleteLogin2FA}
                >
                  <Ionicons name="arrow-back" size={16} color="#666" />
                  <Text style={styles.backButtonText}>Back to Login</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default LoginWith2FAScreen;
