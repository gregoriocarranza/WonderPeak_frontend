import { Pressable, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderUser from "@/components/HeaderUser";
import PostsLayout from "@/components/PostsLayout";
import { router, useLocalSearchParams } from "expo-router";
import i18n from "@/languages";
import { MaterialIcons } from "@expo/vector-icons";
import Tabs from "@/components/Tabs";
import {
  getUserById,
  getUserFollowers,
  getUserFollowing,
  getUserPosts,
} from "@/services/api.service";
import GlobalLoading from "@/components/GlobalLoading";
import UsersList from "@/components/UsersList";
import { Post, UserData, UserInfo } from "@/types/interfaces";

export default function userProfile() {
  const { id } = useLocalSearchParams();
  const validId = Array.isArray(id) ? id[0] : id;

  const [data, setData] = useState<UserInfo | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState(0);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userFollower, setUserFollower] = useState<UserData[]>([]);
  const [userFollowing, setUserFollowing] = useState<UserData[]>([]);

  const userProfileTabs = [
    { id: 0, title: i18n.t("posts"), count: userPosts.length },
    { id: 1, title: i18n.t("followers"), count: userFollower.length },
    { id: 2, title: i18n.t("following"), count: userFollowing.length },
  ];

  const goToSearch = () => {
    router.back();
  };
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <PostsLayout data={userPosts} />;
      case 1:
        return <UsersList data={userFollower} />;
      case 2:
        return <UsersList data={userFollowing} />;
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        if (!id) {
          console.warn("No ID found");
          return;
        }

        const [userData, postsData, userFollower] = await Promise.all([
          getUserById(validId),
          getUserPosts(validId),
          getUserFollowers(validId),
          getUserFollowing(validId),
        ]);

        setData(userData.data);
        setUserPosts(postsData.data);
        setUserFollower(userFollower.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {isLoading ? (
        <GlobalLoading />
      ) : (
        <>
          <HeaderUser
            showGoBack={true}
            goBackAction={goToSearch}
            showDetails={true}
            userData={data}
          />
          <View style={styles.actionsSection}>
            <Pressable style={styles.followButton}>
              <Text className="font-pregular" style={styles.followText}>
                {i18n.t("follow")}
              </Text>
            </Pressable>
            <Pressable style={styles.followButton}>
              <MaterialIcons name="stars" size={24} color={Colors.darkPurple} />
            </Pressable>
          </View>
          <Tabs
            tabs={userProfileTabs}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
          {renderContent()}
        </>
      )}
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
  actionsSection: {
    flexDirection: "row",
    paddingVertical: 4,
    justifyContent: "center",
    gap: 16,
  },
  followButton: {
    borderWidth: 1,
    borderColor: Colors.darkPurple,
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: "auto",
  },
  followText: {
    color: Colors.darkPurple,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
