import { StyleSheet, Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import HeaderHome from "@/components/HeaderHome";
import Post from "@/components/Post";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
