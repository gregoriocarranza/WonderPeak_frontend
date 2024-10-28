import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type TabIconProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  name: string;
  focused: boolean;
};

export default function TabsLayout() {
  const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
    return (
      <View style={focused && styles.tabContainer}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
    );
  };
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#49454F",
          tabBarStyle: {
            backgroundColor: "#F3E8DC",
            height: 80,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="home"
                name="home"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="search"
                name="search"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="add-circle-outline"
                name="create"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="favourites"
          options={{
            title: "Favourites",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="bookmark-outline"
                name="favourites"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="person-outline"
                name="profile"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "#B15164",
    width: 64,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
});
