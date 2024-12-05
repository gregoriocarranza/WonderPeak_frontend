import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/hooks/authContext";
import PostItem from "@/components/Post/Post";
import HeaderHome from "@/components/HeaderHome";
import AdvertisingPost from "@/components/Post/AdvertisingPost";
import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import i18n from "@/languages";
import GlobalLoading from "@/components/GlobalLoading";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

type NotificationType = Notifications.Notification | null;

interface FeedData {
  data: Array<any>;
}

export default function Home() {
  const { token } = useAuth();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const [notification, setNotification] = useState<NotificationType>(null);
  const [page, setPage] = useState<number>(0);
  const [lastPage, setLimitPage] = useState<number>(0);
  const [userFeed, setUserFeed] = useState<FeedData | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        if (notification) {
          setNotification(notification);
          console.info("Notification received in foreground:", notification);
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.info(
          "User interacted with notification:",
          response.notification.request.content
        );
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const getFeedData = async (pageNumber: number = 0) => {
    try {
      let savedToken = token;
      if (!savedToken) {
        savedToken = await AsyncStorage.getItem("token");
      }

      if (!savedToken) {
        console.warn("No token found. User is not authenticated.");
        return;
      }

      const response = await fetch(
        `https://wonderpeak.uade.susoft.com.ar/api/posts/feed?page=${pageNumber}&limit=2&mine=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting feed", error);
      Alert.alert("Error obteniendo posts");
    }
  };

  const fetchUserFeed = async () => {
    try {
      const data = await getFeedData(0);
      setPage(data.page);
      setLimitPage(data.totalPages || data.page);
      setUserFeed(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    setPage(page + 1);
    if (isLastPage()) return;

    setIsLoadingMore(true);
    const data = await getFeedData(page + 1);
    if (!data || !data.count) {
      setIsLoadingMore(false);
      return;
    }

    setUserFeed((prevData) => ({
      data: [...(prevData?.data || []), ...data.data],
    }));
    setIsLoadingMore(false);
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    setPage(0);
    await fetchUserFeed();
    setRefreshing(false);
  };

  const isLastPage = () => {
    return page >= lastPage;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchUserFeed();
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {loading && <GlobalLoading />}

      <HeaderHome />
      {userFeed?.data && userFeed.data.length ? (
        <FlatList
          data={userFeed?.data}
          keyExtractor={(item, index) => `${item.postUuid}-${index}`}
          renderItem={({ item, index }) => (
            <View className="mb-4">
              {item.commerceImage ? (
                <AdvertisingPost {...item} id={index} />
              ) : (
                <PostItem {...item} />
              )}
            </View>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isLoadingMore ? (
              <View style={{ padding: 20 }}>
                <Text className="font-pregular text-center">
                  {i18n.t("loadingMorePosts")}
                </Text>
              </View>
            ) : null
          }
        />
      ) : (
        !loading && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            contentContainerStyle={styles.modalContent}
          >
            <Image source={images.emptyState} style={styles.image} />
            <Text className="font-pbold" style={styles.text}>
              {i18n.t("emptyState")}
            </Text>
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
