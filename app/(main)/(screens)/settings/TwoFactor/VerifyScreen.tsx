import { FC, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import HeaderWrapper from "@/components/headerWrapper";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVerifyTwoFactor } from "@/services/auth/twoFactor/hooks";

// Validation schema
const verifySchema: yup.ObjectSchema<VerifyFormData> = yup.object().shape({
  code: yup
    .string()
    .matches(/^\d{6}$/, "Code must be 6 digits")
    .required("Verification code is required"),
  backupCode: yup.string().optional(),
});

interface VerifyFormData {
  code: string;
  backupCode?: string;
}

interface RouteParams {
  phoneNumber?: string;
}

const VerifyScreen: FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams<any>();
  const phoneNumber = params.phoneNumber || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsingBackupCode, setIsUsingBackupCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);

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
  } = useForm<VerifyFormData>({
    resolver: yupResolver(verifySchema),
    defaultValues: {
      code: "",
      backupCode: "",
    },
    mode: "onChange",
  });

  const { mutate: verifyTwoFactor } = useVerifyTwoFactor();

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

  // Start countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = (data: VerifyFormData) => {
    setIsSubmitting(true);
    const payload = {
      code: data.code,
      backupCode: data.backupCode || "",
    };
    verifyTwoFactor(payload, {
      onSuccess: async() => {
        setVerificationSuccess(true);
        await AsyncStorage.setItem("twoFactorEnabled", "true");
        setTimeout(() => {
          Alert.alert(
            "Success!",
            "Two-factor authentication has been successfully enabled.",
            [
              {
                text: "Finish",
                onPress: () => {
                  router.replace("/(main)/(screens)/settings/TwoFactor");
                },
              },
            ]
          );
        }, 800);
      },
      onError: (error: any) => {
        console.error("Verification error:", error)
        let errorMessage = "Invalid verification code. Please try again.";
        if (error.response?.status === 400) {
          errorMessage = "Invalid or expired code.";
        } else if (error.response?.status === 429) {
          errorMessage = "Too many attempts. Please wait 5 minutes.";
          setCountdown(300); // 5 minutes
        } else if (error.response?.status === 410) {
          errorMessage = "Code has expired. Please generate a new one.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

  const handleUseBackupCode = () => {
    Alert.prompt(
      "Use Backup Code",
      "Enter your backup code",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Use",
          onPress: (backupCode) => {
            if (backupCode) {
              setIsUsingBackupCode(true);
              setValue("backupCode", backupCode);
              setValue("code", "000000"); // Placeholder for backup code flow

              Alert.alert(
                "Backup Code Mode",
                "Backup code entered. Please enter '000000' as the verification code.",
                [{ text: "OK" }]
              );
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const handleResendCode = () => {
    if (countdown > 0) {
      Alert.alert(
        "Please Wait",
        `You can request a new code in ${countdown} seconds.`,
        [{ text: "OK" }]
      );
      return;
    }

    Alert.alert(
      "Code Resent",
      "A new verification code has been sent to your authenticator app.",
      [{ text: "OK" }]
    );
    setCountdown(60);
  };

  const handleBackToEnable = () => {
    router.back();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Verify Code" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressStep}>
                <View style={[styles.progressCircle, styles.progressCompleted]}>
                  <MaterialIcons name="check" size={20} color="#FFF" />
                </View>
                <Text style={styles.progressLabel}>Setup</Text>
              </View>
              <View style={styles.progressLineCompleted} />
              <View style={styles.progressStep}>
                <View style={[styles.progressCircle, styles.progressCompleted]}>
                  <MaterialIcons name="check" size={20} color="#FFF" />
                </View>
                <Text style={styles.progressLabel}>Enable</Text>
              </View>
              <View style={styles.progressLineCompleted} />
              <View style={styles.progressStep}>
                <View style={[styles.progressCircle, styles.progressActive]}>
                  <Text style={styles.progressNumber}>3</Text>
                </View>
                <Text style={styles.progressLabel}>Verify</Text>
              </View>
            </View>

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
                  Two-factor authentication is now active for your account.
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
                {/* Instructions */}
                <View style={styles.instructionCard}>
                  <View style={styles.instructionIcon}>
                    <Ionicons
                      name="shield-checkmark"
                      size={30}
                      color="#3629B7"
                    />
                  </View>
                  <Text style={styles.instructionTitle}>
                    Step 3: Enter Verification Code
                  </Text>
                  <Text style={styles.instructionText}>
                    Open your authenticator app and enter the 6-digit code.
                  </Text>

                  {phoneNumber && (
                    <View style={styles.phoneInfo}>
                      <MaterialIcons name="phone" size={16} color="#666" />
                      <Text style={styles.phoneText}>
                        Backup codes will be sent to: ***{phoneNumber.slice(-3)}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Code Input */}
                <View style={styles.inputCard}>
                  <View style={styles.inputHeader}>
                    <Text style={styles.inputLabel}>6-Digit Code</Text>
                    {/* {attemptsRemaining > 0 && (
                      <Text style={styles.attemptsText}>
                        {attemptsRemaining}{" "}
                        {attemptsRemaining === 1 ? "attempt" : "attempts"}{" "}
                        remaining
                      </Text>
                    )} */}
                  </View>

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
                        editable={!isSubmitting && countdown === 0}
                        autoFocus
                        textAlign="center"
                      />
                    )}
                  />

                  {errors.code && (
                    <Text style={styles.errorText}>{errors.code.message}</Text>
                  )}

                  {/* Auto-submit when 6 digits entered */}
                  {/* {codeValue.length === 6 && isValid && !isSubmitting && (
                    <TouchableOpacity
                      style={styles.autoSubmitHint}
                      onPress={handleSubmit(handleVerify)}
                    >
                      <Text style={styles.autoSubmitText}>
                        Press to verify →
                      </Text>
                    </TouchableOpacity>
                  )} */}
                </View>

                {/* Timer and Resend */}
                {/* <View style={styles.timerContainer}>
                  {countdown > 0 ? (
                    <>
                      <MaterialIcons name="timer" size={20} color="#FF9800" />
                      <Text style={styles.timerText}>
                        New code available in {formatTime(countdown)}
                      </Text>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.resendButton}
                      onPress={handleResendCode}
                      disabled={isSubmitting}
                    >
                      <MaterialIcons name="refresh" size={20} color="#3629B7" />
                      <Text style={styles.resendText}>Resend Code</Text>
                    </TouchableOpacity>
                  )}
                </View> */}

                {/* Backup Code Option */}
                {/* <TouchableOpacity
                  style={styles.backupOption}
                  onPress={handleUseBackupCode}
                  disabled={isSubmitting || isUsingBackupCode}
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
                </TouchableOpacity> */}

                {/* Backup Code Info */}
                {isUsingBackupCode && (
                  <View style={styles.backupInfo}>
                    <MaterialIcons
                      name="info-outline"
                      size={18}
                      color="#2196F3"
                    />
                    <Text style={styles.backupInfoText}>
                      Enter "000000" as the verification code when using backup
                      code
                    </Text>
                  </View>
                )}

                {/* Actions */}
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.verifyButton,
                      (!isValid || isSubmitting || countdown > 0) &&
                        styles.verifyButtonDisabled,
                    ]}
                    onPress={handleSubmit(handleVerify)}
                    disabled={!isValid || isSubmitting || countdown > 0}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <>
                        <Text style={styles.verifyButtonText}>
                          Verify & Activate 2FA
                        </Text>
                        <AntDesign name="arrowright" size={20} color="#FFF" />
                      </>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackToEnable}
                    disabled={isSubmitting}
                  >
                    <AntDesign name="arrowleft" size={16} color="#666" />
                    <Text style={styles.backButtonText}>
                      Back to Previous Step
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Security Info */}
                <View style={styles.securityInfo}>
                  <MaterialIcons name="security" size={20} color="#4CAF50" />
                  <Text style={styles.securityText}>
                    Your account security is being upgraded. This process is
                    encrypted and secure.
                  </Text>
                </View>
              </Animated.View>
            )}

            {/* Loading State */}
            {isSubmitting && !verificationSuccess && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#3629B7" />
                <Text style={styles.loadingText}>Verifying code...</Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  wrapper: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 25,
    paddingHorizontal: 10,
  },
  progressStep: {
    alignItems: "center",
  },
  progressCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  progressCompleted: {
    backgroundColor: "#4CAF50",
  },
  progressActive: {
    backgroundColor: "#3629B7",
  },
  progressNumber: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  progressLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  progressLineCompleted: {
    flex: 1,
    height: 2,
    backgroundColor: "#4CAF50",
    marginHorizontal: 10,
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 12,
    textAlign: "center",
  },
  successText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginBottom: 30,
  },
  instructionCard: {
    backgroundColor: "#F0F7FF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  instructionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3629B7",
    marginBottom: 8,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 12,
  },
  phoneInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  phoneText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 6,
  },
  inputCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  attemptsText: {
    fontSize: 12,
    color: "#FF9800",
    fontWeight: "500",
  },
  codeInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#E9ECEF",
    borderRadius: 10,
    padding: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 8,
    textAlign: "center",
  },
  backupCodeInput: {
    borderColor: "#4CAF50",
    backgroundColor: "#F0F9F0",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  autoSubmitHint: {
    marginTop: 12,
    alignItems: "center",
  },
  autoSubmitText: {
    color: "#3629B7",
    fontSize: 14,
    fontWeight: "500",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#FFF3E0",
    borderRadius: 10,
  },
  timerText: {
    fontSize: 14,
    color: "#FF9800",
    marginLeft: 8,
    fontWeight: "500",
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#3629B7",
    marginLeft: 8,
    fontWeight: "500",
  },
  backupOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginBottom: 12,
  },
  backupOptionText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  backupOptionActive: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  backupInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  backupInfoText: {
    fontSize: 12,
    color: "#2196F3",
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: "#3629B7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  verifyButtonDisabled: {
    backgroundColor: "#A5D6A7",
    opacity: 0.7,
  },
  verifyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  backButtonText: {
    color: "#666",
    fontSize: 14,
    marginLeft: 6,
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9F0",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D4EDDA",
  },
  securityText: {
    fontSize: 12,
    color: "#2E7D32",
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
});

export default VerifyScreen;
