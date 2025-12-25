import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./TwoFactor.styles";
import HeaderWrapper from "@/components/headerWrapper";
import {
  useDisableTwoFactor,
  useIsTwoFactorEnabled,
} from "@/services/auth/twoFactor/hooks";
import { useToast } from "react-native-toast-notifications";

const TwoFactorScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const { data: twoFactorData, isLoading, refetch } = useIsTwoFactorEnabled();
  const { mutate: mutateDisableTwoFactor } = useDisableTwoFactor();

  const isEnabled = twoFactorData?.data?.data || false;

  const handleEnable2FA = () => {
    router.push("/(main)/(screens)/settings/TwoFactor/SetupScreen");
  };

  const handleDisable2FA = () => {
    Alert.alert(
      "Disable Two-Factor Authentication",
      "Are you sure you want to disable two-factor authentication? This will make your account less secure.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Disable",
          style: "destructive",
          onPress: () => {
            mutateDisableTwoFactor(undefined, {
              onSuccess: () => {
                toast.show(
                  "Two-factor authentication has been successfully disabled.",
                  { type: "success" }
                );
                router.back();
              },
              onError: (error: any) => {
                const errorMessage =
                  error.response?.data?.message ||
                  error.response?.data?.error ||
                  error.message ||
                  "Disabled 2FA failed. Please try again.";
                toast.show(errorMessage, { type: "danger" });
              },
            });
            // router.push("/(main)/(screens)/settings/TwoFactor/DisableScreen");
          },
        },
      ]
    );
  };

  const handleViewBackupCodes = () => {
    router.push("/(main)/(screens)/settings/TwoFactor/BackupCodesScreen");
  };

  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Two-Factor Authentication" />

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3629B7" />
            <Text style={styles.loadingText}>Loading 2FA status...</Text>
          </View>
        ) : (
          <View style={styles.content}>
            {/* Status Card */}
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <Text style={styles.statusTitle}>
                  Two-Factor Authentication Status
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    isEnabled ? styles.statusEnabled : styles.statusDisabled,
                  ]}
                >
                  <Text style={styles.statusBadgeText}>
                    {isEnabled ? "ENABLED" : "DISABLED"}
                  </Text>
                </View>
              </View>

              <Text style={styles.statusDescription}>
                {isEnabled
                  ? "Your account is protected with two-factor authentication. You'll need to enter a verification code when signing in."
                  : "Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to enter a verification code in addition to your password."}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              {isEnabled ? (
                <>
            
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleViewBackupCodes}
                  >
                    <Text style={styles.secondaryButtonText}>
                      View Backup Codes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dangerButton}
                    onPress={handleDisable2FA}
                  >
                    <Text style={styles.dangerButtonText}>Disable 2FA</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
       
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleEnable2FA}
                  >
                    <Text style={styles.primaryButtonText}>
                      Enable Two-Factor Authentication
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.helperText}>
                    You'll need an authenticator app like Google Authenticator
                    or Authy
                  </Text>
                </>
              )}
            </View>

            {/* Information Section */}
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>How it works:</Text>
              <View style={styles.infoItem}>
                <Text style={styles.infoNumber}>1</Text>
                <Text style={styles.infoText}>
                  Scan QR code with authenticator app
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoNumber}>2</Text>
                <Text style={styles.infoText}>
                  Enter verification code when signing in
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoNumber}>3</Text>
                <Text style={styles.infoText}>
                  Use backup codes if you lose access
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default TwoFactorScreen;
