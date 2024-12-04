import { RefreshControl, ScrollView, View, StyleSheet } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import PostsLayout from "@/components/PostsLayout";
import i18n from "@/languages";
import Tabs from "@/components/Tabs";
import { getFavoritesPosts, getUserPosts } from "@/services/postServices";
import {
  getUserFavorites,
  getUserFollowers,
  getUserFollowing,
} from "@/services/userServices";
import GlobalLoading from "@/components/GlobalLoading";
import UsersList from "@/components/UsersList";
import { Post, UserData } from "@/types/interfaces";

type TabType = "basic" | "profile" | "favorites";

interface Props {
  id: string;
  type: TabType;
}

enum TabsType {
  Posts = 0,
  Followers = 1,
  Following = 2,
  BestFriends = 3,
}

export default function UserTabsData({ id, type }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<{
    posts: Post[];
    followers: UserData[];
    following: UserData[];
    bestFriends: UserData[];
  }>({
    posts: [],
    followers: [],
    following: [],
    bestFriends: [],
  });

  const handleRefresh = (): void => {
    setRefreshing(true);
    getRequiredData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const commonTabs = useMemo(
    () => [
      {
        id: 0,
        title: i18n.t("posts", { count: data.posts.length }),
        count: data.posts.length,
      },
      {
        id: 1,
        title: i18n.t("followers", { count: data.followers.length }),
        count: data.followers.length,
      },
      {
        id: 2,
        title: i18n.t("following", { count: data.following.length }),
        count: data.following.length,
      },
    ],
    [data.posts.length, data.followers.length, data.following.length]
  );

  const tabs = useMemo(
    () => ({
      basic: commonTabs,
      favorites: [{ id: 0, title: i18n.t("saved"), count: data.posts.length }],
      profile: [
        ...commonTabs,
        {
          id: 3,
          title: i18n.t("bestFriends"),
          count: data.bestFriends.length,
        },
      ],
    }),
    [commonTabs, data.posts.length, data.bestFriends.length]
  );

  const renderContent = () => {
    switch (activeTab) {
      case TabsType.Posts:
        return (
          <PostsLayout
            data={data.posts}
            refreshing={refreshing}
            handleRefresh={handleRefresh}
          />
        );
      case TabsType.Followers:
        return (
          <UsersList
            data={data.followers}
            refreshing={refreshing}
            handleRefresh={handleRefresh}
          />
        );
      case TabsType.Following:
        return (
          <UsersList
            data={data.following}
            refreshing={refreshing}
            handleRefresh={handleRefresh}
          />
        );
      case TabsType.BestFriends:
        return type === "profile" ? (
          <UsersList
            data={data.bestFriends}
            refreshing={refreshing}
            handleRefresh={handleRefresh}
          />
        ) : null;
      default:
        return null;
    }
  };

  const fetchData = async (
    fetcher: () => Promise<{ data: any }>,
    errorMessage: string,
    dataKey: keyof typeof data
  ) => {
    try {
      const response = await fetcher();
      setData((prevData) => ({ ...prevData, [dataKey]: response.data }));
    } catch (error) {
      throw new Error(errorMessage, { cause: error });
    }
  };

  const getPosts = () =>
    fetchData(() => getUserPosts(id), "Error getting posts", "posts");

  const getFollowers = () =>
    fetchData(
      () => getUserFollowers(id),
      "Error getting followers",
      "followers"
    );

  const getFollowing = () =>
    fetchData(
      () => getUserFollowing(id),
      "Error getting following",
      "following"
    );

  const getBestFriend = () =>
    fetchData(
      () => getUserFavorites(id),
      "Error getting best friend",
      "bestFriends"
    );

  const getFavoritesData = async () => {
    try {
      const response = await getFavoritesPosts();
      setData({
        posts: response.data,
        followers: [],
        following: [],
        bestFriends: [],
      });
    } catch (error) {
      throw new Error("Error getting favorites posts", { cause: error });
    }
  };

  const getRequiredData = async () => {
    try {
      if (type === "favorites") {
        await getFavoritesData();
        return;
      }

      const dataFetchers = [
        getPosts(),
        getFollowers(),
        getFollowing(),
        type === "profile" ? getBestFriend() : null,
      ];

      await Promise.all(dataFetchers);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!id) {
        console.warn("No ID found");
        return;
      }

      try {
        setIsLoading(true);
        type === "favorites"
          ? await getFavoritesData()
          : await getRequiredData();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [id, type]);

  if (isLoading) return <GlobalLoading />;

  return (
    <View style={{ flex: 1 }}>
      <Tabs tabs={tabs[type]} activeTab={activeTab} onTabPress={setActiveTab} />
      {renderContent()}
    </View>
  );
}
