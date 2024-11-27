import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface Tab {
  id: number;
  title: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  onTabPress: (tabId: number) => void;
}

export default function Tabs({ tabs, activeTab, onTabPress }: TabsProps) {
  const screenWidth = Dimensions.get("window").width;
  const minTabWidth = screenWidth / tabs?.length;

  const renderTab = ({ item: tab }: { item: Tab }) => (
    <Pressable
      key={tab.id}
      style={[
        styles.tab,
        { minWidth: minTabWidth },
        activeTab === tab.id && styles.activeTab,
      ]}
      onPress={() => onTabPress(tab.id)}
    >
      <Text
        className="font-pregular"
        style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}
      >
        {`${tab.count || 0} ${tab.title}`}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.scrollContainer}>
      <FlatList
        data={tabs}
        renderItem={renderTab}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.tabsContainer,
          { minWidth: screenWidth },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.tabsBackground,
    height: 50,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lavenderGray,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.darkPurple,
  },
  tabText: {
    color: Colors.darkPink,
    fontSize: 14,
  },
  activeTabText: {
    color: Colors.darkPurple,
    fontWeight: "500",
  },
});
