import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./CardSuccess.styles";
import Container from "@/components/common/container";

const CardSuccessScreen = () => {
  // **** jsx ****
  return (
    <Container
      withWrapper
      wrapperStyles={{ display: "flex", flexDirection: "column", rowGap: 25 }}
    >
      <Image
        source={require("../../../../../../assets/images/success-prepaid.webp")}
        style={{ marginHorizontal: "auto", width: 316, height: 196 }}
      />
      <Text style={styles.title}>Transaction successfully!</Text>
      <Text style={styles.desc}>You have successfully traded!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default CardSuccessScreen;
