import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderHome from "@/components/HeaderHome";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/authContext";
import PostItem from "@/components/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "@/constants";
import i18n from "@/languages";

export default function Home() {
  const { token } = useAuth();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRefresh = (): void => {
    setRefreshing(true);
    fetchUserFeed();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const [userFeed, setUserFeed] = useState<any | null>(null);

  const fetchUserFeed = async () => {
    try {
      setLoading(true);
      let savedToken = token;
      if (!savedToken) {
        savedToken = await AsyncStorage.getItem("token");
      }

      if (!savedToken) {
        console.warn("No token found. User is not authenticated.");
        return;
      }

      const response = await fetch("https://wonderpeak.uade.susoft.com.ar/api/posts/feed?page=0&limit=20&mine=true", {
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
      console.log(data, "USER FEED");
      setUserFeed(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFeed();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {loading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={"large"} color={Colors.white} />
        </View>
      )}

      <HeaderHome />
      {userFeed?.data && userFeed.data.length ? (
        <FlatList
          data={userFeed?.data}
          keyExtractor={(item, index) => `${item.postUuid}-${index}`}
          renderItem={({ item }) => (
            <View className="mb-4">
              <PostItem {...item} />
            </View>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        !loading && (
          <View style={styles.modalContent}>
            <Image source={images.emptyState} style={styles.image} />
            <Text className="font-pbold" style={styles.text}>
              {i18n.t("emptyState")}
            </Text>
          </View>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000033",
    zIndex: 1,
  },
  image: {
    width: 300,
    height: 300,
    maxWidth: "100%",
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    width: "80%",
    color: Colors.light.text,
  },
});
