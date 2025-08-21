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

const PrepaidSuccessScreen = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <Image source={require("../../../../../../../assets/images/success-prepaid.png")}/>
      <Text style={styles.title}>Payment success!</Text>
      <Text style={styles.desc}>
        You have successfully paid mobile prepaid!
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrepaidSuccessScreen;
