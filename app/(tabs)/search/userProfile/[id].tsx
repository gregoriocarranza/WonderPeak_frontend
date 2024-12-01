import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import i18n from "@/languages";
import {
  getUserById,
  handleUserFavorite,
  handleUserFollow,
} from "@/services/userServices";
import { UserInfo } from "@/types/interfaces";
import HeaderUser from "@/components/HeaderUser";
import GlobalLoading from "@/components/GlobalLoading";
import UserTabsData from "@/components/UserTabsData";

export default function userProfile() {
  const { id } = useLocalSearchParams();
  const validId = Array.isArray(id) ? id[0] : id;

  const [data, setData] = useState<UserInfo | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const goToSearch = () => {
    router.replace("/search");
  };
  const handleFollow = async () => {
    try {
      setIsLoadingFollow(true);
      await handleUserFollow(validId);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error handling the user follow");
    } finally {
      setIsLoadingFollow(false);
    }
  };
  const handleFavorite = async () => {
    try {
      setIsLoadingFavorite(true);
      await handleUserFavorite(validId);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error handling the user as favorite");
    } finally {
      setIsLoadingFavorite(false);
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

        const userData = await getUserById(validId);

        setData(userData.data);
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
            avatarSize={100}
          />
          <View style={styles.actionsSection}>
            <Pressable
              style={[
                styles.followButton,
                isFollowing && styles.stopFollowButton,
              ]}
              onPress={handleFollow}
              disabled={isLoadingFollow}
            >
              {isLoadingFollow ? (
                <ActivityIndicator color={Colors.darkPurple} />
              ) : (
                <Text
                  className="font-pregular"
                  style={[
                    styles.followText,
                    isFollowing && styles.stopFollowText,
                  ]}
                >
                  {i18n.t(isFollowing ? "stopFollowing" : "follow")}
                </Text>
              )}
            </Pressable>
            <Pressable
              style={[
                styles.followButton,
                isFavorite && styles.favoritesButton,
              ]}
              onPress={handleFavorite}
              disabled={isLoadingFavorite}
            >
              {isLoadingFavorite ? (
                <ActivityIndicator color={Colors.darkPurple} />
              ) : (
                <MaterialIcons
                  name="stars"
                  size={24}
                  color={isFavorite ? Colors.white : Colors.darkPurple}
                />
              )}
            </Pressable>
          </View>
          <UserTabsData id={validId} type="basic" />
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
  stopFollowButton: {
    borderColor: Colors.violet,
    backgroundColor: Colors.darkPurple,
  },
  stopFollowText: {
    color: Colors.white,
  },
  favoritesButton: {
    borderColor: Colors.green,
    backgroundColor: Colors.green,
  },
});
