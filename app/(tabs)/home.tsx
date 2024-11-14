import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderHome from "@/components/HeaderHome";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/authContext";
import PostItem from "@/components/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const { token } =  useAuth();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchUserFeed()
    }, 2000);
  };

  const [userFeed, setUserFeed] = useState<any | null>(null);

  const fetchUserFeed = async () => {
    try {
      let savedToken = token;
      if (!savedToken) {
        savedToken = await AsyncStorage.getItem("token");
      }

      if (!savedToken) {
        console.warn("No token found. User is not authenticated.");
        return;
      }

      const response = await fetch("https://wonderpeak.uade.susoft.com.ar/api/posts/feed?page=0&limit=20", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener la información del usuario");
      }
      //!! aca hay que trabajar un poco mas esto para que se pueda recuperar del Context si la info ya esta
      const data = await response.json();
      console.log(data, "USER FEED")
      setUserFeed(data)

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
        data={userFeed?.data}
        keyExtractor={(item) => item.postUuid}
        renderItem={({ item }) => (
          <View className="mb-4" key={item.postUuid}>
            <PostItem {...item} />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
