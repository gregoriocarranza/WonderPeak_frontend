import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import i18n from "@/languages";
import HeaderSearch from "@/components/HeaderSearch";
import SearchList from "@/components/SearchList";
import { getUsers } from "@/services/api.service";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isEmptyState, setIsEmptyState] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const clearSearch = (): void => {
    setSearchQuery("");
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchUsers(text);
    }, 500);

    setSearchTimeout(timeout);
  };

  const fetchUsers = async (query?: string) => {
    try {
      const response = await getUsers(query);

      if (!response || !response.data.length) {
        setIsEmptyState(true);
        return;
      }

      setIsEmptyState(false);
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderSearch
        query={searchQuery}
        handleSeach={(e) => handleSearch(e)}
        clearSearch={clearSearch}
      />
      {isEmptyState || !data?.length ? (
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

          {data && <SearchList data={data} />}
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
