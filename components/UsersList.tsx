import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { UserData } from "@/types/interfaces";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "@/languages";

type RenderItemProp = {
  item: UserData;
};

type Props = {
  data: UserData[];
  refreshing: boolean;
  handleRefresh: () => void;
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

export default function UsersList({ data, refreshing, handleRefresh }: Props) {
  return (
    <>
      {data && data.length ? (
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => <RenderItem item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            refreshing={refreshing}
          />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.emptyStateContainer}
        >
          <MaterialIcons
            name="person-outline"
            size={100}
            color={Colors.lavenderGray}
          />
          <Text className="font-pbold" style={styles.text}>
            {i18n.t("emptyStateUsers")}
          </Text>
        </ScrollView>
      )}
    </>
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    maxWidth: 300,
    textAlign: "center",
    lineHeight: 42,
    width: "80%",
    marginTop: 16,
    color: Colors.lavenderGray,
  },
});
