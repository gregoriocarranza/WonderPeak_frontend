import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { isLoading } from "expo-font";
import { Colors } from "@/constants/Colors";

type Props = {
  label: string;
  theme?: "auth" | "primary" | "secondary";
  onPress?: () => void;
  isLoading?: boolean;
};

export default function CustomButton({
  label,
  theme = "secondary",
  onPress,
  isLoading,
}: Props) {
  const themeStyles = {
    primary: styles.primaryButton,
    auth: styles.authButton,
    secondary: styles.secondaryButton,
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, themeStyles[theme] || styles.secondaryButton]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text
          className="font-pregular"
          style={[
            styles.buttonLabel,
            theme === "primary" || theme === "auth"
              ? styles.primaryButtonLabel
              : styles.secondaryButtonLabel,
          ]}
        >
          {isLoading ? "Cargando..." : label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 28,
    height: 60,
    justifyContent: "center",
    width: 270,
  },
  buttonLabel: {
    fontSize: 16,
  },
  primaryButtonLabel: {
    color: Colors.white,
  },
  secondaryButtonLabel: {
    color: Colors.light.buttonBackground,
  },
  authButton: {
    backgroundColor: Colors.pink,
  },
  primaryButton: {
    backgroundColor: Colors.light.buttonBackground,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.light.buttonBackground,
    borderStyle: "solid",
    borderWidth: 2,
  },
});
