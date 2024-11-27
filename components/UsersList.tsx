import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { UserData } from "@/types/interfaces";
import { Colors } from "@/constants/Colors";

type RenderItemProp = {
  item: UserData;
};

type Props = {
  data: UserData[];
};

const RenderItem = ({ item }: RenderItemProp) => {
  return (
    <View className="w-full" style={styles.userContainer}>
      <Link
        href={{
          pathname: "/search/userProfile/[id]",
          params: { id: item.userUuid },
        }}
      >
        <View className="flex-row" style={styles.userData}>
          <Image source={{ uri: item.profileImage }} style={styles.userImage} />
          <Text
            style={{ color: Colors.darkBlack }}
            className="font-pregular"
          >{`${item.name} ${item.lastname || ""}`}</Text>
        </View>
      </Link>
    </View>
  );
};

export default function UsersList({ data }: Props) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem item={item} />}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 8,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 16,
  },
  userData: {
    flex: 1,
    alignItems: "center",
  },
});
