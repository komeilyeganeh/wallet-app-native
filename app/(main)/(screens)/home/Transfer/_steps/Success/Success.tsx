import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Success.styles";
import Container from "@/components/common/container";

interface TransferSuccessProps {
  onConfirm: () => void;
  transferData?: any;
}

const TransferSuccess = ({ onConfirm, transferData }: TransferSuccessProps) => {
  const amount = transferData?.amount || "1,000";
  const recipientName = "Amanda";

  // **** jsx ****
  return (
    <Container
      containerStyles={{
        marginTop: 26,
        display: "flex",
        flexDirection: "column",
        rowGap: 25,
      }}
    >
      <Image
        source={require("../../../../../../../assets/images/withdraw.webp")}
        style={{ marginHorizontal: "auto", width: 342, height: 188 }}
      />
      <Text style={styles.title}>Transfer successful!</Text>
      <Text style={styles.desc}>
        You have successfully transferred{" "}
        <Text style={{ color: "#FF4267", fontWeight: "bold" }}>$ {amount}</Text>{" "}
        to{" "}
        <Text style={{ color: "#281C9D", fontWeight: "bold" }}>
          {recipientName}!
        </Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default TransferSuccess;
