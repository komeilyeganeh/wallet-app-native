import { lazy } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderWrapper = lazy(
  () => import("@/components/headerWrapper/HeaderWrapper")
);

const CardDetail = () => {
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Card" />
        <View style={styles.content}>
          <View style={styles.item}>
            <Text style={styles.itemKey}>Name</Text>
            <Text style={styles.itemValue}>Push Puttichai</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemKey}>Card number</Text>
            <Text style={styles.itemValue}>**** **** 9018</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemKey}>Valid from</Text>
            <Text style={styles.itemValue}>10/15</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemKey}>Good thru</Text>
            <Text style={styles.itemValue}>10/20</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemKey}>Available balance</Text>
            <Text style={styles.itemValue}>$10,000</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={{ color: "#FF4267", fontSize: 16, textAlign: "center" }}>
            Delete card
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343434",
  },
  content: {
    display: "flex",
    rowGap: 16,
    marginTop: 16,
  },
  item: {
    width: "100%",
    height: 43,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  itemKey: {
    fontSize: 16,
    color: "#989898",
  },
  itemValue: {
    fontSize: 16,
    color: "#281C9D",
    fontWeight: "bold",
  },
  deleteButton: {
    height: 44,
    marginTop: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardDetail;
