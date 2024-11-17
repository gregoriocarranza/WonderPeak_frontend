import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import i18n from "@/languages";
import HeaderSearch from "@/components/HeaderSearch";
import { StatusBar } from "expo-status-bar";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const clearSearch = (): void => {
    setSearchQuery("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderSearch
        query={searchQuery}
        handleSeach={(e) => setSearchQuery(e)}
        clearSearch={clearSearch}
      />
      <View className="items-center">
        <Text className="font-pbold" style={styles.text}>
          {i18n.t("noRecentSearches")}
        </Text>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    textAlign: "center",
    lineHeight: 42,
    width: "80%",
    marginTop: 60,
    color: Colors.lavenderGray,
  },
});
