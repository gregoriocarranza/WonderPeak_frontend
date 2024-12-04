import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/authContext";

interface DataUser {
  userUuid: string;
  name: string;
  lastname: string | null;
  nickname: string;
  profileImage: string;
}

interface Props {
  data: DataUser[];
}

const RenderElement = ({ user }: { user: DataUser }) => {
  const { userInfo } = useAuth();
  const userData = userInfo ? JSON.parse(userInfo) : null;

  const goToProfile = () => {
    router.push({
      pathname: "/search/userProfile/[id]",
      params: { id: user.userUuid },
    });
  };
  return (
    <View>
      <Pressable onPress={goToProfile} style={styles.borderTop}>
        <View className="flex-row" style={styles.itemGlobalContainer}>
          <Image
            source={{ uri: userData?.profileImage }}
            style={styles.itemImage}
          />
          <View style={styles.userData}>
            <Text className="font-psemibold">{`${user.name || ""} ${
              user.lastname || ""
            }`}</Text>
            <Text style={styles.userNickname} className="font-pregular">
              {`@${user.nickname}`}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default function SearchList({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.userUuid}
      renderItem={({ item }) => <RenderElement user={item} />}
    />
  );
}

const styles = StyleSheet.create({
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itemGlobalContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  itemImage: {
    height: 48,
    width: 48,
    borderRadius: 50,
  },
  userData: {
    paddingLeft: 12,
  },
  userNickname: {
    fontSize: 12,
    color: Colors.gray,
  },
});
