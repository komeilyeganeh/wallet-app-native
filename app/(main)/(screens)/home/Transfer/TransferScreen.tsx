import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import TransferForm from "./_steps/Form";
import ConfirmTransfer from "./_steps/Confirm";
import TransferSuccess from "./_steps/Success";
import styles from "./Transfer.styles";
import HeaderWrapper from "@/components/headerWrapper";
import { useState } from "react";
import { useTransferAmount } from "./_steps/Form/api/useTransfer";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";

const TransferScreen = () => {
  const [currentStep, setCurrentStep] = useState<"form" | "confirm" | "success">("form");
  const [transferData, setTransferData] = useState<any>(null);
  const { mutate: mutateTransfer, isPending } = useTransferAmount();
  const toast = useToast();
  const router = useRouter();

  const handleFormSubmit = (data: any) => {
    setTransferData(data);
    setCurrentStep("confirm");
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
  };

  const handleConfirmTransfer = (otp: string) => {
    if (!transferData) return;

    const finalData = {
      ...transferData,
      // otp: otp
    };
    
    mutateTransfer(finalData, {
      onSuccess: () => {
        toast.show("Transfer Successfully.", { type: "success" });
        setCurrentStep("success"); 
      },
      onError: (error) => {
        toast.show("Error performing transfer", { type: "danger" });
        console.error("Transfer error:", error);
      },
    });
  };

  const handleSuccessConfirm = () => {
    router.replace("/(main)/(screens)/home/Transfer");
  };

  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Transfer" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.content}>
              {currentStep === "form" && (
                <TransferForm onFormSubmit={handleFormSubmit} />
              )}
              {currentStep === "confirm" && (
                <ConfirmTransfer 
                  transferData={transferData}
                  onBack={handleBackToForm}
                  onConfirm={handleConfirmTransfer}
                  isPending={isPending}
                />
              )}
              {currentStep === "success" && (
                <TransferSuccess onConfirm={handleSuccessConfirm} />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default TransferScreen;