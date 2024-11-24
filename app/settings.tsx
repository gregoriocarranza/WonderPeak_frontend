import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import HeaderUser from "@/components/HeaderUser";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import i18n from "@/languages";
import CustomButton from "@/components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";

type FormState = {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  gender: string;
  description: string;
};

export default function Settings() {
  const [form, setForm] = useState<FormState>({
    name: "",
    lastname: "",
    nickname: "",
    email: "",
    gender: "",
    description: "",
  });

  const goBack = () => {
    router.back();
  };

  const handleForm = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderUser
        isOwner={false}
        showGoBack={true}
        showDetails={false}
        goBackAction={goBack}
      />
      <ScrollView className="border-2" style={styles.formContainer}>
        <View className="px-6">
          <FormField
            title={i18n.t("name")}
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            placeholder={i18n.t("name")}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("lastName")}
            value={form.lastname}
            handleChangeText={(e) => setForm({ ...form, lastname: e })}
            placeholder={i18n.t("lastName")}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("nickname")}
            value={form.nickname}
            handleChangeText={(e) => setForm({ ...form, nickname: e })}
            placeholder={i18n.t("nickname")}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("email")}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            placeholder={i18n.t("email")}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("gender")}
            value={form.gender}
            handleChangeText={(e) => setForm({ ...form, gender: e })}
            placeholder={i18n.t("gender")}
            otherStyles="mb-4"
          />
        </View>
      </ScrollView>
      <View className="pt-4 pl-4">
        <Pressable style={styles.actionButton}>
          <MaterialIcons name="password" size={24} color="black" />
          <Text className="ml-4 font-pregular">{i18n.t("editPassword")}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <MaterialIcons name="password" size={24} color="black" />
          <Text className="ml-4 font-pregular">{i18n.t("editPassword")}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <MaterialIcons name="password" size={24} color="black" />
          <Text className="ml-4 font-pregular">{i18n.t("editPassword")}</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <CustomButton
          label={i18n.t("save")}
          theme="primary"
          onPress={handleForm}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 24,
    paddingTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 4,
    paddingHorizontal: 12,
    width: 200,
    borderRadius: 24,
  },
});
