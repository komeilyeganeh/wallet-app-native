import { FC } from "react";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View } from "react-native";
import HeaderWrapper from "@/components/headerWrapper";
import MessageItem from "@/components/message/MessageCard";
import styles from "@/assets/styles/tabs/messages.styles";

const MessageScreen: FC = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Messsage" />
        <View style={styles.messageItems}>
          <MessageItem
            icon={<Entypo name="home" size={22} color="white" />}
            color="#3629B7"
            title="Bank of America"
            description="Bank of America : 256486 is the au..."
            date="Today"
          />
          <MessageItem
            icon={<FontAwesome name="user" size={22} color="white" />}
            color="#FF4267"
            title="Account"
            description="Your account is limited. Please foll..."
            date="12/10"
          />
          <MessageItem
            icon={
              <MaterialCommunityIcons
                name="cellphone-message"
                size={22}
                color="white"
              />
            }
            color="#0890FE"
            title="Alert"
            description="Your statement is ready for you to..."
            date="11/10"
          />
          <MessageItem
            icon={<FontAwesome6 name="paypal" size={22} color="white" />}
            color="#FFAF2A"
            title="Paypal"
            description="Your account has been locked. Ple..."
            date="11/10"
          />
          <MessageItem
            icon={
              <FontAwesome5 name="money-bill-wave" size={22} color="white" />
            }
            color="#52D5BA"
            title="Withdraw"
            description="Dear customer, 2987456 is your co..."
            date="11/10"
          />
        </View>
      </View>
    </View>
  );
};

export default MessageScreen;
