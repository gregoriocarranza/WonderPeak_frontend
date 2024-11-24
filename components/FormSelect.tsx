import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import i18n from "@/languages";
import { Colors } from "@/constants/Colors";

const data = [
  { label: i18n.t("female"), value: "female" },
  { label: i18n.t("male"), value: "male" },
  { label: i18n.t("other"), value: "other" },
];

export default function FormSelect() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View className={`sapce-y-2 w-full`}>
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
        placeholder={i18n.t("gender")}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          setValue(item.value);
          setIsFocus(false);
        }}
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
    marginTop: 16,
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
