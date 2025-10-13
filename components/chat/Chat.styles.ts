import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    flex: 1,
    paddingTop: 12,
  },
  date: {
    fontSize: 12,
    color: "#989898",
    textAlign: "center",
  },
  messageInput: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 12,
  },
  sendButton: {
    borderRadius: 100,
    padding: 5,
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3629B7",
  },
  sendButtonDisabled: {
    backgroundColor: "#F2F1F9",
  },
  msgItem: {
    padding: 16,
    borderRadius: 15,
    marginVertical: 10,
  },
  receiveMsg: {
    backgroundColor: "#F2F1F9",
    marginRight: "auto",
  },
  sendMsg: {
    backgroundColor: "#3629B7",
    marginLeft: "auto",
  },
  textMsg: {
    fontSize: 14,
  },
  input: {
    width: "84%",
    borderRadius: 14.5,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    padding: 11.5,
    fontSize: 14,
    color: "#333"
  },
});
export default styles;
