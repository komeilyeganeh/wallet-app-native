import { FC, useState } from "react";
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
} from "react-native";
import { useRouter } from "expo-router";
import HeaderWrapper from "@/components/headerWrapper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useEnableTwoFactor } from "@/services/auth/twoFactor/hooks";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "@/components/common/container";

// Validation schema
const enableSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
});

interface EnableFormData {
  phoneNumber: string;
}

const EnableScreen: FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<EnableFormData>({
    resolver: yupResolver(enableSchema),
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onChange",
  });

  const phoneNumber = watch("phoneNumber");

  const { mutate: enableTwoFactor } = useEnableTwoFactor();

  const handleEnable = (data: EnableFormData) => {
    setIsSubmitting(true);

    enableTwoFactor(
      {
        enable: true,
        phoneNumber: data.phoneNumber,
      },
      {
        onSuccess: () => {
          Alert.alert(
            "Success",
            "Two-factor authentication has been enabled. A verification code will be sent to your authenticator app.",
            [
              {
                text: "Continue",
                onPress: () => {
                  // Navigate to verification screen
                  router.push({
                    pathname:
                      "/(main)/(screens)/settings/TwoFactor/VerifyScreen",
                    params: { phoneNumber: data.phoneNumber },
                  });
                },
              },
            ]
          );
        },
        onError: (error: any) => {
          let errorMessage =
            "Failed to enable two-factor authentication. Please try again.";

          if (error.response?.status === 400) {
            errorMessage = "Invalid phone number format.";
          } else if (error.response?.status === 409) {
            errorMessage = "Two-factor authentication is already enabled.";
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
          }

          Alert.alert("Error", errorMessage);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  //   const handleUseDifferentPhone = () => {
  //     Alert.prompt(
  //       "Use Different Phone",
  //       "Enter a different phone number",
  //       [
  //         { text: "Cancel", style: "cancel" },
  //         {
  //           text: "Update",
  //           onPress: (newPhone) => {
  //             if (newPhone && newPhone.match(/^[0-9]{11}$/)) {
  //               setValue("phoneNumber", newPhone);
  //             } else {
  //               Alert.alert(
  //                 "Invalid",
  //                 "Please enter a valid 11-digit phone number"
  //               );
  //             }
  //           },
  //         },
  //       ],
  //       "plain-text",
  //       phoneNumber
  //     );
  //   };

  // **** jsx ****
  return (
    <Container withWrapper containerStyles={{ backgroundColor: "#FFF" }}>
      <HeaderWrapper title="Enable Two-Factor" />

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
              <View style={[styles.progressCircle, styles.progressActive]}>
                <Text style={styles.progressNumber}>2</Text>
              </View>
              <Text style={styles.progressLabel}>Enable</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={[styles.progressCircle, styles.progressInactive]}>
                <Text style={styles.progressNumber}>3</Text>
              </View>
              <Text style={styles.progressLabel}>Verify</Text>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructionCard}>
            <View style={styles.instructionIcon}>
              <MaterialIcons name="smartphone" size={30} color="#3629B7" />
            </View>
            <Text style={styles.instructionTitle}>
              Step 2: Enter Phone Number
            </Text>
            <Text style={styles.instructionText}>
              Enter your phone number to receive SMS backup codes. This is
              optional but recommended.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9]/g, "");
                      field.onChange(numeric);
                    }}
                    placeholder="09123456789"
                    placeholderTextColor="#999"
                    style={[
                      styles.input,
                      errors.phoneNumber && styles.inputError,
                    ]}
                    keyboardType="phone-pad"
                    maxLength={11}
                    editable={!isSubmitting}
                    autoFocus
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>
                  {errors.phoneNumber.message}
                </Text>
              )}

              <View style={styles.phoneHelper}>
                <MaterialIcons name="info-outline" size={16} color="#666" />
                <Text style={styles.helperText}>
                  Enter 11-digit phone number (optional)
                </Text>
              </View>
            </View>

            {/* Phone Benefits */}
            <View style={styles.benefitsCard}>
              <Text style={styles.benefitsTitle}>Why add phone number?</Text>
              <View style={styles.benefitItem}>
                <MaterialIcons name="sms" size={20} color="#4CAF50" />
                <Text style={styles.benefitText}>
                  Receive SMS backup codes if you lose authenticator app
                </Text>
              </View>
              <View style={styles.benefitItem}>
                <MaterialIcons name="security" size={20} color="#4CAF50" />
                <Text style={styles.benefitText}>
                  Extra layer of account recovery
                </Text>
              </View>
              <View style={styles.benefitItem}>
                <MaterialIcons name="notifications" size={20} color="#4CAF50" />
                <Text style={styles.benefitText}>
                  Get notified of important security events
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  (!isValid || isSubmitting) && styles.primaryButtonDisabled,
                ]}
                onPress={handleSubmit(handleEnable)}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>
                      Enable & Continue
                    </Text>
                    <AntDesign name="arrowright" size={20} color="#FFF" />
                  </>
                )}
              </TouchableOpacity>

              {/* {phoneNumber && (
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={handleUseDifferentPhone}
                  disabled={isSubmitting}
                >
                  <Text style={styles.linkButtonText}>
                    Use different phone number
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>

            {/* Next Steps Info */}
            <View style={styles.nextStepsCard}>
              <Text style={styles.nextStepsTitle}>What's Next?</Text>
              <View style={styles.nextStepItem}>
                <View style={styles.nextStepNumber}>
                  <Text style={styles.nextStepNumberText}>1</Text>
                </View>
                <Text style={styles.nextStepText}>
                  Check your authenticator app for a 6-digit code
                </Text>
              </View>
              <View style={styles.nextStepItem}>
                <View style={styles.nextStepNumber}>
                  <Text style={styles.nextStepNumberText}>2</Text>
                </View>
                <Text style={styles.nextStepText}>
                  Enter the code in the next step
                </Text>
              </View>
              <View style={styles.nextStepItem}>
                <View style={styles.nextStepNumber}>
                  <Text style={styles.nextStepNumberText}>3</Text>
                </View>
                <Text style={styles.nextStepText}>
                  Two-factor authentication will be activated
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
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
  progressInactive: {
    backgroundColor: "#E9ECEF",
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
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#E9ECEF",
    marginHorizontal: 10,
  },
  progressLineCompleted: {
    flex: 1,
    height: 2,
    backgroundColor: "#4CAF50",
    marginHorizontal: 10,
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
  },
  formCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 6,
  },
  phoneHelper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 6,
  },
  benefitsCard: {
    backgroundColor: "#F0F9F0",
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#D4EDDA",
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#3629B7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  primaryButtonDisabled: {
    backgroundColor: "#A5D6A7",
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  linkButton: {
    padding: 12,
    alignItems: "center",
  },
  linkButtonText: {
    color: "#3629B7",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  nextStepsCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  nextStepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  nextStepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3629B7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  nextStepNumberText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  nextStepText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    lineHeight: 20,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#FED7D7",
  },
  warningText: {
    fontSize: 14,
    color: "#C53030",
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});

export default EnableScreen;
