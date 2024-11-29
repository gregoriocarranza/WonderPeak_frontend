import { View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import PostsLayout from "@/components/PostsLayout";
import i18n from "@/languages";
import Tabs from "@/components/Tabs";
import { getUserPosts } from "@/services/postServices";
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

export default function UserTabsData({ id, type }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
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
      case 0:
        return <PostsLayout data={data.posts} />;
      case 1:
        return <UsersList data={data.followers} />;
      case 2:
        return <UsersList data={data.following} />;
      case 3:
        return type === "profile" ? (
          <UsersList data={data.bestFriends} />
        ) : null;
      default:
        return null;
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
        const requests = [
          getUserPosts(id),
          getUserFollowers(id),
          getUserFollowing(id),
        ];

        if (type === "profile") {
          requests.push(getUserFavorites(id));
        }

        const responses = await Promise.all(requests);

        setData({
          posts: responses[0].data,
          followers: responses[1].data,
          following: responses[2].data,
          bestFriends: responses[3]?.data || [],
        });
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
