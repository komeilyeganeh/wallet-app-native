import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import styles from "./Chat.styles";
import ChatBox from "@/components/chat";
import HeaderWrapper from "@/components/headerWrapper";
import Container from "@/components/common/container";

const ChatScreen = () => {
  const params = useLocalSearchParams();
  // **** jsx ****
  return (
    <Container withWrapper>
      <HeaderWrapper title={params?.title as string} />
      <View style={styles.content}>
        <ChatBox />
      </View>
    </Container>
  );
};

export default ChatScreen;
