import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/hooks/authContext";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="set-password"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
