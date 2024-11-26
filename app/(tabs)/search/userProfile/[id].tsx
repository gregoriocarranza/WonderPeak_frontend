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
import { getUserById, getUserPosts } from "@/services/api.service";
import GlobalLoading from "@/components/GlobalLoading";

interface UserData {
  active: number;
  coverImage: string;
  description: string;
  email: string;
  gamificationLevel: number;
  gender: string;
  lastname: string | null;
  name: string;
  nickname: string;
  profileImage: string;
  userUuid: string;
}

export default function userProfile() {
  const { id } = useLocalSearchParams();
  const validId = Array.isArray(id) ? id[0] : id;

  const [data, setData] = useState<UserData | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState(0);
  const [userPosts, setUserPosts] = useState([]);

  const userProfileTabs = [
    { id: 0, title: i18n.t("posts") },
    { id: 1, title: i18n.t("followers"), count: 5 },
    { id: 2, title: i18n.t("following"), count: 16 },
  ];

  const goToSearch = () => {
    router.back();
  };
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      if (!id) {
        console.warn("No ID found");
        return;
      }

      const response = await getUserById(validId);
      setData(response.data);
      console.log(response.data, "USER DATA");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserPosts = async () => {
    try {
      setIsLoading(true);
      if (!id) {
        console.warn("No ID found");
        return;
      }

      const response = await getUserPosts(validId);
      setUserPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <PostsLayout data={userPosts} />;
      case 1:
        return (
          <View style={styles.placeholder}>{/* Componente Followers */}</View>
        );
      case 2:
        return (
          <View style={styles.placeholder}>{/* Componente Following */}</View>
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  useEffect(() => {
    if (activeTab === 0) {
      fetchUserPosts();
    }
  }, [activeTab]);

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
