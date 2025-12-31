import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Success.styles";
import Container from "@/components/common/container";

const AddSaveOnlineSuccess = () => {
  const { width } = Dimensions.get("window");
  // **** jsx ****
  return (
    <Container
      withWrapper
      wrapperStyles={{ display: "flex", flexDirection: "column", rowGap: 25 }}
    >
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
    </Container>
  );
};

export default AddSaveOnlineSuccess;
