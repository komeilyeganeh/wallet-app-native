import HeaderWrapper from "@/components/headerWrapper/HeaderWrapper";
import { View } from "react-native";
import PrepaidForm from "./_steps/Form";
import styles from "./MobilePrepaid.styles";

const MobilePrepaidScreen = () => {
    // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Mobile prepaid"/>
        <View style={styles.content}>
           <PrepaidForm />
           {/* <ConfirmPrepaid /> */}
           {/* <PrepaidSuccess /> */}
        </View>
      </View>
    </View>
  );
};

export default MobilePrepaidScreen;
