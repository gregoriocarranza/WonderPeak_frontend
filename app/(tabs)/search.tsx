import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import i18n from "@/languages";
import HeaderSearch from "@/components/HeaderSearch";
import { StatusBar } from "expo-status-bar";
import SearchList from "@/components/SearchList";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isEmptyState, setIsEmptyState] = useState<boolean>(false);

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
      {isEmptyState ? (
        <View className="items-center">
          <Text className="font-pbold" style={styles.text}>
            {i18n.t("noRecentSearches")}
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.deleteHistoryBtn}>
            <Pressable onPress={() => setIsEmptyState(true)}>
              <Text style={styles.deleteHistoryText} className="font-pbold">
                {i18n.t("deleteHistory")}
              </Text>
            </Pressable>
          </View>

          <View>
            <SearchList />
          </View>
        </>
      )}

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
  deleteHistoryBtn: {
    height: 30,
    paddingRight: 12,
    justifyContent: "center",
  },
  deleteHistoryText: {
    color: Colors.light.buttonBackground,
    alignSelf: "flex-end",
    fontSize: 12,
  },
});
