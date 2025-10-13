import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import styles from "./Chat.styles";
import ChatBox from "@/components/chat";
import HeaderWrapper from "@/components/headerWrapper";

const ChatScreen = () => {
  const params = useLocalSearchParams();
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title={params?.title as string} />
        <View style={styles.content}>
            <ChatBox />
        </View>
      </View>
    </View>
  );
};



export default ChatScreen;
