import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderHome from "@/components/HeaderHome";
import Post from "@/components/Post";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/authContext";

export default function Home() {
  const { token } = useAuth();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const [userFeed, setUserFeed] = useState<any | null>(null);

  const fetchUserFeed = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/posts/feed?page=0&limit=20", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener la información del usuario");
      }
      //!! aca hay que trabajar un poco mas esto para que se pueda recuperar del Context si la info ya esta
      const data = await response.json();
      console.log(data, "USER FEED")
setUserFeed(data.data)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserFeed();
  }, []);


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
