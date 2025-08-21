import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Success.styles";

const AddSaveOnlineSuccess = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require("../../../../../../../assets/images/add-save-online.png")}
          style={{ marginHorizontal: "auto" }}
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
