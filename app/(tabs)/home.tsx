import React, { useState } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderHome from "@/components/HeaderHome";
import Post from "@/components/Post";
import { Colors } from "@/constants/Colors";

export default function Home() {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderHome />
      <FlatList
        data={[
          {
            id: "1",
          },
          {
            id: "2",
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Post userName={item.id} />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
