import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { colorScheme } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  title?: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  type?: string;
  keyboardType?: TextInputProps["keyboardType"];
};

export default function FormField({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  keyboardType,
  type,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`sapce-y-2 ${otherStyles} w-full`}>
      <Text className="text-base font-pregular text-black focus:border-secondary">
        {title}
      </Text>

      <View className="w-full h-16  bg-white rounded-3xl">
        <TextInput
          style={styles.customField}
          className="focus:border-2 flex-1 font-pregular text-black rounded-3xl"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          keyboardType={keyboardType}
        />

        {type === "password" && (
          <Pressable
            style={styles.handlePasswordVisibility}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <MaterialIcons
              name={!showPassword ? "visibility" : "visibility-off"}
              size={24}
              color={Colors.gray}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  customField: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 30,
    borderColor: Colors.pink,
  },
  handlePasswordVisibility: {
    position: "absolute",
    right: 20,
    top: 14,
  },
});
