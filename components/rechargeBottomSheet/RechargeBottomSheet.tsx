import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MaterialIndicator } from "react-native-indicators";
import styles from "./RechargeBottomSheet.styles";

type RechargeData = {
  operator: string;
  phoneNumber: string;
  amount: number;
  description?: string;
};

type RechargeConfirmationSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  rechargeData: RechargeData | null;
  onConfirm: () => void;
  isSubmitting?: boolean;
};

const RechargeConfirmationSheet: React.FC<RechargeConfirmationSheetProps> = ({
  isVisible,
  onClose,
  rechargeData,
  onConfirm,
  isSubmitting = false,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    onClose();
  }, [onClose]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  if (!rechargeData) return null;

  const getOperatorName = (operator: string) => {
    switch (operator) {
      case "MCI":
        return "Hamrah Aval";
      case "MTN":
        return "Irancell";
      case "Rightel":
        return "Rightel";
      default:
        return operator;
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 1 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
    >
      <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 40 : 20, padding: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Confirmation of charge request</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Operator</Text>
              <Text style={styles.infoValue}>
                {getOperatorName(rechargeData.operator)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone number</Text>
              <Text style={styles.infoValue}>{rechargeData.phoneNumber}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Charge amount</Text>
              <Text style={styles.amountValue}>
                {rechargeData.amount.toLocaleString()}
              </Text>
            </View>

            {rechargeData.description && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Description</Text>
                <Text style={styles.infoValue}>{rechargeData.description}</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton, (isSubmitting) && styles.buttonDisabled]}
              onPress={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <MaterialIndicator size={22} color="#fff" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirm and send</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default RechargeConfirmationSheet;
