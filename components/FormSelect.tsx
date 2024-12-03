import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import i18n from "@/languages";
import { Colors } from "@/constants/Colors";

type itemType = {
  label: string;
  value: string;
};

type Props = {
  handleChange: (text: string) => void;
  title?: string;
  placeholder: string;
  data: itemType[];
  initialValue?: string;
};

export default function FormSelect({
  handleChange,
  title,
  placeholder,
  data,
  initialValue = "",
}: Props) {
  const [value, setValue] = useState<string>(initialValue);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderItem = (item: itemType) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const handleChangeState = (value: string) => {
    setValue(value);
    handleChange(value);
    setIsFocus(false);
  };

  return (
    <View className={`sapce-y-2 w-full`}>
      {title && (
        <Text className="text-base font-pregular text-black focus:border-secondary">
          {title}
        </Text>
      )}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: Colors.pink, borderWidth: 2 },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: itemType) => handleChangeState(item.value)}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 30,
    height: 56,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: Colors.gray,
  },
  selectedTextStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  inputSearchStyle: {
    display: "none",
  },
});
