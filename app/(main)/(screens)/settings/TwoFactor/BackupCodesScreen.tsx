import React, { FC, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Clipboard,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

interface BackupCode {
  id: string;
  code: string;
  used: boolean;
  createdAt: string;
}

const BackupCodesScreen: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [backupCodes, setBackupCodes] = useState<BackupCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useFocusEffect(
    useCallback(() => {
      loadBackupCodes();
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        setSelectedCodes([]);
      };
    }, [])
  );

  const loadBackupCodes = async () => {
    try {
      setIsLoading(true);
      const storedCodes = await AsyncStorage.getItem("twoFactorBackupCodes");
      if (storedCodes) {
        const parsedCodes = JSON.parse(storedCodes);
        const formattedCodes: BackupCode[] = parsedCodes.map(
          (code: any, index: number) => ({
            id: code.id || `code-${index}-${Date.now()}`,
            code: code.code || code,
            used: code.used || false,
            createdAt: code.createdAt || new Date().toISOString(),
          })
        );

        setBackupCodes(formattedCodes);
      } else {
        setBackupCodes([]);
      }
    } catch (error) {
      console.error("Error loading backup codes:", error);
      toast.show("Failed to load backup codes", {
        type: "danger",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    Clipboard.setString(code);
    toast.show("Code copied to clipboard", {
      type: "success",
      duration: 2000,
    });
  };

  const handleCopyAllCodes = () => {
    const allCodes = backupCodes
      .filter((code) => !code.used)
      .map((code) => code.code)
      .join("\n");

    if (!allCodes) {
      toast.show("No available codes to copy", {
        type: "warning",
        duration: 3000,
      });
      return;
    }

    Clipboard.setString(allCodes);
    toast.show("All codes copied to clipboard", {
      type: "success",
      duration: 2000,
    });
  };

  const handleMarkAsUsed = async () => {
    if (selectedCodes.length === 0) {
      toast.show("Please select codes first", {
        type: "warning",
        duration: 3000,
      });
      return;
    }

    Alert.alert(
      "Mark as Used",
      `Mark ${selectedCodes.length} code(s) as used? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Mark Used",
          onPress: async () => {
            try {
              const updatedCodes = backupCodes.map((code) =>
                selectedCodes.includes(code.id) ? { ...code, used: true } : code
              );
              await AsyncStorage.setItem(
                "twoFactorBackupCodes",
                JSON.stringify(updatedCodes)
              );
              setBackupCodes(updatedCodes);
              setSelectedCodes([]);

              toast.show("Codes marked as used", {
                type: "success",
                duration: 3000,
              });
            } catch (error) {
              console.error("Error marking codes as used:", error);
              toast.show("Failed to update codes", {
                type: "danger",
                duration: 3000,
              });
            }
          },
        },
      ]
    );
  };

  const getUnusedCodesCount = () => {
    return backupCodes.filter((code) => !code.used).length;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3629B7" />
        <Text style={styles.loadingText}>Loading backup codes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="#3629B7" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Backup Codes</Text>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Instructions */}
          <View style={styles.instructionsCard}>
            <View style={styles.instructionsHeader}>
              <Ionicons name="information-circle" size={24} color="#2196F3" />
              <Text style={styles.instructionsTitle}>Important Notes</Text>
            </View>

            <View style={styles.instructionItem}>
              <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.instructionText}>
                Each backup code can only be used once
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.instructionText}>
                Store codes in a secure location (password manager, encrypted
                file)
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.instructionText}>
                Codes are case-sensitive
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.copyAllButton,
                getUnusedCodesCount() === 0 && styles.actionButtonDisabled,
              ]}
              onPress={handleCopyAllCodes}
              disabled={getUnusedCodesCount() === 0}
            >
              <Feather name="copy" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}>Copy All</Text>
            </TouchableOpacity>
          </View>

          {/* Backup Codes Grid */}
          <View style={styles.codesContainer}>
            <View style={styles.codesHeader}>
              <Text style={styles.codesTitle}>Your Backup Codes</Text>
              <Text style={styles.codesSubtitle}>
                Save these codes in a secure location
              </Text>
            </View>

            {backupCodes.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="keyboard-off"
                  size={60}
                  color="#CCCCCC"
                />
                <Text style={styles.emptyStateTitle}>No Backup Codes</Text>
                <Text style={styles.emptyStateText}>
                  Generate backup codes to use when you can't access your
                  authenticator app
                </Text>
              </View>
            ) : (
              <View style={styles.codesGrid}>
                {backupCodes.map((code, index) => (
                  <TouchableOpacity
                    key={code.id}
                    style={[
                      styles.codeCard,
                      code.used && styles.codeCardUsed,
                      selectedCodes.includes(code.id) &&
                        styles.codeCardSelected,
                    ]}
                    onPress={() => {
                      handleCopyCode(code.code);
                    }}
                    disabled={code.used}
                  >
                    <Text
                      style={[
                        styles.codeText,
                        code.used && styles.codeTextUsed,

                        selectedCodes.includes(code.id) &&
                          styles.codeTextSelected,
                      ]}
                    >
                      {code.code}
                    </Text>

                    <View style={styles.codeFooter}>
                      <Text style={styles.codeNumber}>#{index + 1}</Text>

                      {code.used ? (
                        <View style={styles.usedBadge}>
                          <MaterialIcons name="done" size={12} color="#FFF" />
                          <Text style={styles.usedText}>Used</Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.copyButton}
                          onPress={() => handleCopyCode(code.code)}
                        >
                          <Feather name="copy" size={14} color="#3629B7" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Security Warning */}
          <View style={styles.securityWarning}>
            <MaterialIcons name="security" size={20} color="#FF9800" />
            <Text style={styles.securityWarningText}>
              ⚠️ For security, never share these codes. Store them securely and
              access only when needed.
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3629B7",
  },
  selectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectButtonText: {
    color: "#3629B7",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3629B7",
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E9ECEF",
  },
  instructionsCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2196F3",
    marginLeft: 8,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 13,
    color: "#1565C0",
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  selectionActions: {
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  copyAllButton: {
    backgroundColor: "#4CAF50",
  },
  downloadButton: {
    backgroundColor: "#2196F3",
  },
  markUsedButton: {
    backgroundColor: "#FF9800",
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  regenerateMainButton: {
    backgroundColor: "#3629B7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    gap: 8,
  },
  regenerateMainButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  codesContainer: {
    marginBottom: 20,
  },
  codesHeader: {
    marginBottom: 16,
  },
  codesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  codesSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderStyle: "dashed",
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  generateButton: {
    backgroundColor: "#3629B7",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  generateButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  codesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  codeCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#E9ECEF",
    position: "relative",
  },
  codeCardSelectable: {
    borderColor: "#E9ECEF",
  },
  codeCardSelected: {
    borderColor: "#3629B7",
    backgroundColor: "#F0F7FF",
  },
  codeCardUsed: {
    backgroundColor: "#F8F9FA",
    borderColor: "#E9ECEF",
    opacity: 0.7,
  },
  selectionIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  codeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 1,
  },
  codeTextUsed: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  codeTextSelected: {
    color: "#3629B7",
  },
  codeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  codeNumber: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  usedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF9800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  usedText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "500",
  },
  copyButton: {
    padding: 4,
  },
  codeDate: {
    fontSize: 10,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  securityWarning: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF3E0",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFE0B2",
    gap: 12,
  },
  securityWarningText: {
    flex: 1,
    fontSize: 13,
    color: "#E65100",
    lineHeight: 18,
  },
});

export default BackupCodesScreen;
