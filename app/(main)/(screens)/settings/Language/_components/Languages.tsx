import { FC, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Language.styles";

const flags = {
  VN: require("../../../../../../assets/images/flags/VN.png"),
  FR: require("../../../../../../assets/images/flags/FR.png"),
  EN: require("../../../../../../assets/images/flags/EN.png"),
  JP: require("../../../../../../assets/images/flags/JP.png"),
  PR: require("../../../../../../assets/images/flags/PR.png"),
  CH: require("../../../../../../assets/images/flags/CH.png"),
  KR: require("../../../../../../assets/images/flags/KR.png"),
  NIC: require("../../../../../../assets/images/flags/NICA.png"),
  RS: require("../../../../../../assets/images/flags/RS.png"),
};

const langs = [
  { id: 1, name: "Vietnamese", code: "vn", flag: flags.VN },
  { id: 2, name: "Frech", code: "fr", flag: flags.FR },
  { id: 3, name: "English", code: "en", flag: flags.EN },
  { id: 4, name: "Japanese", code: "jp", flag: flags.JP },
  { id: 5, name: "Portuguese", code: "pr", flag: flags.PR },
  { id: 6, name: "China", code: "ch", flag: flags.CH },
  { id: 7, name: "Korea", code: "kr", flag: flags.KR },
  { id: 8, name: "Nicaragua", code: "ni", flag: flags.NIC },
  { id: 9, name: "Russia", code: "rs", flag: flags.RS },
  { id: 10, name: "Russia", code: "rs", flag: flags.RS },
  { id: 11, name: "Russia", code: "rs", flag: flags.RS },
  { id: 12, name: "Russia", code: "rs", flag: flags.RS },
  { id: 13, name: "Russia", code: "rs", flag: flags.RS },
  { id: 14, name: "Russia", code: "rs", flag: flags.RS },
];

const Languages: FC = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const handleSelectLang = (code: string) => {
    setSelectedLang(code);
  };
  // **** jsx ****
  return langs.map(
    (lng: { id: number; name: string; code: string; flag: any }) => (
      <TouchableOpacity
        key={lng.id}
        style={styles.langItem}
        onPress={() => handleSelectLang(lng.code)}
      >
        <View style={styles.langInfo}>
          <Image source={lng.flag} />
          <Text
            style={{
              color: selectedLang === lng.code ? "#343434" : "#989898",
              fontSize: 16,
            }}
          >
            {lng.name}
          </Text>
        </View>
        {selectedLang === lng.code && (
          <Text style={styles.checkmark}>&#10003;</Text>
        )}
      </TouchableOpacity>
    )
  );
};

export default Languages;
