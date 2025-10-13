import { Entypo } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeaderWrapper from "@/components/headerWrapper";
import styles from "./Beneficiary.styles";

const BeneficiaryScreen = () => {
    // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Beneficiary" />
        <View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 55 }}>
            <Text style={styles.title}>Transfer via card number</Text>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
            <Text style={styles.title}>Transfer to the same bank</Text>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
            <Text style={styles.title}>Transfer to another bank</Text>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
            <View style={styles.item}>
                <Image source={require("../../../../../assets/images/girl.png")}/>
                <View>
                    <Text style={styles.titleText}>Olivia</Text>
                    <Text style={styles.descText}>034512456</Text>
                </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text><Entypo name="plus" size={24} color="white" /></Text>
      </TouchableOpacity>
    </View>
  );
};



export default BeneficiaryScreen;
