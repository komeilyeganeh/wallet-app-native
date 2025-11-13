import { SelectBoxPropsType } from "@/types/inputs";
import { FontAwesome } from "@expo/vector-icons";
import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import ModalSelector from "react-native-modal-selector";
import styles from "./SelectBox.styles";

const SelectBox: FC<SelectBoxPropsType> = ({
  data,
  onChange,
  value,
  label,
  disabled,
  ...rest
}) => {
  // **** jsx ****
  return (
    <ModalSelector
      data={data}
      initValue={label}
      onChange={(option: any) => onChange(option)}
      optionContainerStyle={styles.optionsContainer}
      optionStyle={styles.option}
      optionTextStyle={styles.optionText}
      cancelContainerStyle={styles.cancelContainer}
      cancelText="Close"
      disabled={disabled}
      {...rest}
    >
      <TouchableOpacity style={styles.selectTrigger}>
        <Text style={[styles.selectText, value && styles.selectedItem]}>
          {value || label}
        </Text>
        <FontAwesome name="unsorted" size={18} color="#bbbbbbff" />
      </TouchableOpacity>
    </ModalSelector>
  );
};

export default SelectBox;
