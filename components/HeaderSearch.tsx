import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/authContext";
import Avatar from "@/components/Avatar";
import i18n from "@/languages";

type UserData = {
  profileImage: string;
  gamificationLevel: string;
};

type Props = {
  query: string;
  handleSeach: (text: string) => void;
  clearSearch: () => void;
};

export default function HeaderSearch({
  query,
  handleSeach,
  clearSearch,
}: Props) {
  const { userInfo } = useAuth();
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    if (userInfo) {
      const parsedData = JSON.parse(userInfo);
      const { profileImage, gamificationLevel } = parsedData;
      setUserData({ profileImage, gamificationLevel });
    }
  }, [userInfo]);

  return (
    <View className="flex-row gap-4" style={styles.header}>
      <LinearGradient
        colors={[Colors.white, Colors.paleGray]}
        style={styles.headerBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View>
        <Avatar
          image={userData?.profileImage}
          gamification={userData?.gamificationLevel}
        />
      </View>
      <View className="flex-row" style={styles.search}>
        <View style={styles.searchIconContainer}>
          <MaterialIcons name="search" size={24} color={Colors.darkBlack} />
        </View>
        <TextInput
          style={styles.searchField}
          className="flex-1 font-pregular text-blacks"
          value={query}
          placeholder={`${i18n.t("search")}...`}
          placeholderTextColor={Colors.darkBlack}
          onChangeText={handleSeach}
        />
        <View style={styles.clearIconContainer}>
          <Pressable onPress={clearSearch}>
            <MaterialIcons name="clear" size={16} color={Colors.darkBlack} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  searchIconContainer: {
    position: "absolute",
    top: 12,
    left: 20,
  },
  clearIconContainer: {
    position: "absolute",
    top: "50%",
    marginTop: -8,
    right: 20,
  },
  search: {
    backgroundColor: Colors.light.tabsBackground,
    height: 48,
    width: 264,
    borderRadius: 28,
  },
  searchField: {
    paddingHorizontal: 56,
  },
});
