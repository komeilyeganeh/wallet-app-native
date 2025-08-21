import { MessageItemPropsType } from "@/types/messageItem";
import { Link } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";
import styles from "./MessageCard.styles";

const MessageCard: FC<MessageItemPropsType> = ({
  icon,
  color,
  title,
  date,
  description,
}) => {
  return (
    <Link
      href={{
        pathname: "/(main)/(screens)/chat/ChatScreen",
        params: {
          title,
        },
      }}
    >
      <View style={styles.container}>
        <View style={[styles.icon, { backgroundColor: color }]}>{icon}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.messageTitle}>{title}</Text>
          <Text style={styles.messageDesc}>{description}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Link>
  );
};

export default MessageCard;
