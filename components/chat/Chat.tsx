import { Feather } from "@expo/vector-icons";
import { useKeyboard } from "@react-native-community/hooks";
import { FC, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./Chat.styles";

const ChatBox: FC = () => {
  const scrollViewRef = useRef<any>(null);
  const keyboard = useKeyboard();
  const [msg, setMsg] = useState("");
  // **** jsx ****
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0 },
      ]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
      >
        <View style={styles.messages}>
          <Text style={styles.date}>8/10/2018</Text>
          <View style={[styles.receiveMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#343434" }]}>
              Reply YES or NO
            </Text>
          </View>
          <View style={[styles.sendMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#FFF" }]}>YES</Text>
          </View>
          <Text style={styles.date}>10/10/2018</Text>
          <View style={[styles.receiveMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#343434" }]}>
              Bank of America : 256486
            </Text>
          </View>
          <View style={[styles.sendMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#FFF" }]}>Thanks!</Text>
          </View>
          <View style={[styles.receiveMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#343434" }]}>
              Bank of America : 256486
            </Text>
          </View>
          <View style={[styles.sendMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#FFF" }]}>Thanks!</Text>
          </View>
          <View style={[styles.receiveMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#343434" }]}>
              Bank of America : 256486
            </Text>
          </View>
          <View style={[styles.sendMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#FFF" }]}>Thanks!</Text>
          </View>
          <View style={[styles.receiveMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#343434" }]}>
              Bank of America : 256486
            </Text>
          </View>
          <View style={[styles.sendMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#FFF" }]}>Thanks!</Text>
          </View>
          <View style={[styles.receiveMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#343434" }]}>
              Bank of America : 256486
            </Text>
          </View>
          <View style={[styles.sendMsg, styles.msgItem]}>
            <Text style={[styles.textMsg, { color: "#FFF" }]}>Thanks!</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.messageInput}>
        <TextInput
          placeholder="Type something...."
          style={styles.input}
          placeholderTextColor="#CACACA"
          onChangeText={(e) => setMsg(e)}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            msg.length === 0 && styles.sendButtonDisabled,
          ]}
          disabled={msg.length === 0}
        >
          <Feather name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBox;
