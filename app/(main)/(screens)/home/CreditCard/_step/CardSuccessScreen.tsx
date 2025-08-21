import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./CardSuccess.styles";

const CardSuccessScreen = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require("../../../../../../assets/images/success-prepaid.png")}
          style={{ marginHorizontal: "auto" }}
        />
        <Text style={styles.title}>Transaction successfully!</Text>
        <Text style={styles.desc}>
          You have successfully traded!
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardSuccessScreen;
