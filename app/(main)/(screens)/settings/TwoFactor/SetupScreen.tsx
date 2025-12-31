import { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Clipboard,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderWrapper from "@/components/headerWrapper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useSetupTwoFactor } from "@/services/auth/twoFactor/hooks";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Container from "@/components/common/container";

interface SetupResponse {
  qrImageCode: string;
  secretKey: string;
  backupCodes: string[];
  message?: string;
}

const SetupScreen: FC = () => {
  const router = useRouter();
  const [setupData, setSetupData] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [savedBackupCodes, setSavedBackupCodes] = useState(false);

  const { mutate: setup, isPending, error } = useSetupTwoFactor();

  // Generate setup data on component mount
  useEffect(() => {
    generateSetup();
  }, []);

  const generateSetup = () => {
    setup(undefined, {
      onSuccess: async (res: any) => {
        setSetupData(res);
        if (res?.data?.data?.backupCodes) {
          await AsyncStorage.setItem(
            "twoFactorBackupCodes",
            JSON.stringify(res?.data?.data?.backupCodes)
          );
        }
      },
      onError: (error: any) => {
        Alert.alert(
          "Setup Failed",
          error.response?.data?.message ||
            "Failed to generate setup codes. Please try again.",
          [
            { text: "Cancel", onPress: () => router.back() },
            { text: "Retry", onPress: generateSetup },
          ]
        );
      },
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    Clipboard.setString(text);
    setIsCopied(true);
    Alert.alert("Copied", `${label} copied to clipboard`);

    setTimeout(() => setIsCopied(false), 2000);
  };

  const markBackupCodesSaved = () => {
    setSavedBackupCodes(true);
    Alert.alert(
      "Important",
      "Make sure you've saved your backup codes in a secure location.",
      [{ text: "I've Saved Them" }]
    );
  };

  const proceedToNextStep = () => {
    if (!savedBackupCodes) {
      Alert.alert(
        "Warning",
        "Have you saved your backup codes? You won't be able to see them again.",
        [
          { text: "Go Back", style: "cancel" },
          {
            text: "Proceed Anyway",
            onPress: () =>
              router.push("/(main)/(screens)/settings/TwoFactor/EnableScreen"),
          },
        ]
      );
    } else {
      router.push("/(main)/(screens)/settings/TwoFactor/EnableScreen");
    }
  };

  // **** jsx ****
  return (
    <Container withWrapper containerStyles={{ backgroundColor: "#FFF" }}>
      <HeaderWrapper title="Setup Two-Factor" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.progressCircle, styles.progressActive]}>
              <Text style={styles.progressNumber}>1</Text>
            </View>
            <Text style={styles.progressLabel}>Setup</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.progressCircle, styles.progressInactive]}>
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

        {isPending ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3629B7" />
            <Text style={styles.loadingText}>Generating setup codes...</Text>
          </View>
        ) : setupData ? (
          <>
            {/* Instructions */}
            <View style={styles.instructionCard}>
              <Text style={styles.instructionTitle}>Step 1: Scan QR Code</Text>
              <Text style={styles.instructionText}>
                Open your authenticator app (Google Authenticator, Authy, etc.)
                and scan the QR code below.
              </Text>
            </View>

            {/* QR Code Section */}
            <View style={styles.qrCard}>
              <View style={styles.qrContainer}>
                {setupData?.data?.data.qrCodeImageBase64 ? (
                  setupData?.data?.data?.qrCodeImageBase64.startsWith(
                    "data:image"
                  ) ? (
                    <Image
                      src={setupData?.data?.data?.qrCodeImageBase64}
                      style={styles.qrImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <QRCode
                      value={setupData?.data?.data?.qrCodeImageBase64}
                      size={220}
                      color="#000"
                      backgroundColor="#FFF"
                    />
                  )
                ) : (
                  <Text style={styles.errorText}>QR Code not available</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.regenerateButton}
                onPress={generateSetup}
                disabled={isPending}
              >
                <MaterialIcons name="refresh" size={20} color="#3629B7" />
                <Text style={styles.regenerateButtonText}>
                  Regenerate QR Code
                </Text>
              </TouchableOpacity>
            </View>

            {/* Secret Key Section */}
            <View style={styles.secretCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Can't scan? Use Secret Key
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    copyToClipboard(
                      setupData?.data?.data.secretKey,
                      "Secret key"
                    )
                  }
                  style={styles.copyButton}
                >
                  <MaterialIcons
                    name={isCopied ? "check" : "content-copy"}
                    size={20}
                    color={isCopied ? "#4CAF50" : "#3629B7"}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.secretKeyContainer}>
                <Text style={styles.secretKeyText} selectable>
                  {setupData?.data?.data.secretKey}
                </Text>
              </View>

              <Text style={styles.helperText}>
                Enter this code manually in your authenticator app
              </Text>
            </View>

            {/* Backup Codes Section */}
            <View style={styles.backupCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Backup Codes</Text>
                <TouchableOpacity
                  onPress={markBackupCodesSaved}
                  style={[
                    styles.saveButton,
                    savedBackupCodes && styles.saveButtonActive,
                  ]}
                >
                  <Text style={styles.saveButtonText}>
                    {savedBackupCodes ? "✓ Saved" : "Mark as Saved"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.warningText}>
                ⚠️ Save these codes in a secure location! You'll need them if
                you lose access to your authenticator app.
              </Text>

              <View style={styles.backupCodesGrid}>
                {setupData?.data?.data?.backupCodes?.map(
                  (code: any, index: any) => (
                    <View key={index} style={styles.backupCodeItem}>
                      <Text style={styles.backupCodeText} selectable>
                        {code}
                      </Text>
                      <TouchableOpacity
                        style={styles.smallCopyButton}
                        onPress={() =>
                          copyToClipboard(code, `Backup code ${index + 1}`)
                        }
                      >
                        <MaterialIcons
                          name="content-copy"
                          size={16}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>
                  )
                )}
              </View>

              <TouchableOpacity
                style={styles.copyAllButton}
                onPress={() => {
                  const allCodes =
                    setupData?.data?.data?.backupCodes.join("\n");
                  copyToClipboard(allCodes, "All backup codes");
                }}
              >
                <MaterialIcons name="content-copy" size={18} color="#FFF" />
                <Text style={styles.copyAllButtonText}>Copy All Codes</Text>
              </TouchableOpacity>
            </View>

            {/* Next Step Button */}
            <TouchableOpacity
              style={[
                styles.nextButton,
                !savedBackupCodes && styles.nextButtonDisabled,
              ]}
              onPress={proceedToNextStep}
              disabled={!savedBackupCodes && !isPending}
            >
              <Text style={styles.nextButtonText}>Continue to Next Step</Text>
              <AntDesign name="arrowright" size={20} color="#FFF" />
            </TouchableOpacity>

            {/* Warning */}
            {!savedBackupCodes && (
              <Text style={styles.warningMessage}>
                Please save your backup codes before proceeding
              </Text>
            )}
          </>
        ) : error ? (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={50} color="#FF3B30" />
            <Text style={styles.errorMessage}>
              Failed to generate setup data
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={generateSetup}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  instructionCard: {
    backgroundColor: "#F0F7FF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3629B7",
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3629B7",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  qrCard: {
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
  },
  qrContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  regenerateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  regenerateButtonText: {
    color: "#3629B7",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  secretCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  copyButton: {
    padding: 6,
  },
  secretKeyContainer: {
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    marginBottom: 8,
  },
  secretKeyText: {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#333",
    textAlign: "center",
    letterSpacing: 1,
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  backupCard: {
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#FED7D7",
  },
  warningText: {
    fontSize: 14,
    color: "#C53030",
    marginBottom: 16,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: "#E9ECEF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveButtonActive: {
    backgroundColor: "#D4EDDA",
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
  backupCodesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backupCodeItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  backupCodeText: {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#333",
    flex: 1,
  },
  smallCopyButton: {
    padding: 4,
    marginLeft: 8,
  },
  copyAllButton: {
    backgroundColor: "#3629B7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  copyAllButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  downloadButton: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3629B7",
  },
  downloadButtonText: {
    color: "#3629B7",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: "#3629B7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  nextButtonDisabled: {
    backgroundColor: "#A5D6A7",
    opacity: 0.7,
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  warningMessage: {
    textAlign: "center",
    color: "#C53030",
    fontSize: 14,
    marginBottom: 30,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
    padding: 20,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "#333",
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#3629B7",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SetupScreen;
