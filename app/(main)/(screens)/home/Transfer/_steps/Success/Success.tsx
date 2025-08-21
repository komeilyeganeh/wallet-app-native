import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import styles from "./Success.styles";

// form validation
const schema = yup.object().shape({
  card: yup.string().required(),
  phoneNumber: yup.string().required(),
  amount: yup.string().required(),
});

const TransferSuccess = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <Image source={require("../../../../../../../assets/images/withdraw.png")} />
      <Text style={styles.title}>Transfer successful!</Text>
      <Text style={styles.desc}>
        You have successfully transferred{" "}
        <Text style={{ color: "#FF4267", fontWeight: "bold" }}>$ 1,000</Text> to{" "}
        <Text style={{ color: "#281C9D", fontWeight: "bold" }}>Amanda!</Text>
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransferSuccess;
