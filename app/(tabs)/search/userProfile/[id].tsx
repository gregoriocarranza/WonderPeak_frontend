import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderUser from "@/components/HeaderUser";
import PostsLayout from "@/components/PostsLayout";
import { router, useLocalSearchParams } from "expo-router";
import i18n from "@/languages";
import { MaterialIcons } from "@expo/vector-icons";
import Tabs from "@/components/Tabs";
import { useAuth } from "@/hooks/authContext";
import { getUserById } from "@/services/api.service";

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
  const [data, setData] = useState<UserData | undefined>();
  const [isLoading, setIsLoading] = useState(true);

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

      const response = await getUserById(id as string);
      setData(response.data);
      console.log(response.data, "USER DATA");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {isLoading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={"large"} color={Colors.white} />
        </View>
      ) : (
        <>
          <HeaderUser
            showGoBack={true}
            goBackAction={goToSearch}
            showDetails={true}
            userData={{
              name: data?.name ?? "",
              nickname: data?.nickname ?? "",
              description: data?.description ?? "",
              profileImage: data?.profileImage ?? "",
              coverImage: data?.coverImage ?? "",
              gamificationLevel: data?.gamificationLevel ?? 0,
              email: data?.email ?? "",
              gender: data?.gender ?? "",
              lastname: data?.lastname ?? "",
              userUuid: data?.userUuid ?? "",
              active: data?.active ?? 0,
            }}
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
          <Tabs />
        </>
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
});
