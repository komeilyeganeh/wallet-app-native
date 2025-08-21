import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Card.styles";

const CardTab = () => {
  return (
    <View>
      <Link href="/(main)/(screens)/home/AccountAndCard/CardDetail">
        {/* <CreditCard /> */}
      </Link>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add new card</Text>
      </TouchableOpacity>
    </View>
  );
};



export default CardTab;
