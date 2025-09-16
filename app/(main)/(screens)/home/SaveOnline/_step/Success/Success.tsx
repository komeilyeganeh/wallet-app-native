import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Success.styles";

const AddSaveOnlineSuccess = () => {
  const { width } = Dimensions.get("window");
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require("../../../../../../../assets/images/add-save-online.webp")}
          style={{ width: width - 40, height: 220 }}
          resizeMode="contain"
        />
        <Text style={styles.title}>Save online successfully!</Text>
        <Text style={styles.desc}>
          Congratulations! You have save money online successfully!
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddSaveOnlineSuccess;
