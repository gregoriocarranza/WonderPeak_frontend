import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import i18n from "@/languages";

type FormState = {
  name: string;
  lastName: string;
  nickname: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [form, setForm] = useState<FormState>({
    name: "",
    lastName: "",
    nickname: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const showAlert = (titleKey: string, bodyKey: string): void => {
    const title = i18n.t(titleKey);
    const body = i18n.t(bodyKey);

    Alert.alert(title, body);
  };
  const validatePasswords = (): boolean => {
    return form.password === form.confirmPassword;
  };
  const validateFormField = (): boolean => {
    if (!Object.values(form).every(Boolean)) {
      showAlert("incompleteFields", "compleAllFields");
      return false;
    }

    if (!validatePasswords()) {
      showAlert("incorrectPasswords", "passwordsNotMatch");
      return false;
    }

    return true;
  };
  const submit = (): void => {
    setIsSubmitting(true);
    if (!validateFormField()) {
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };
  const goToLogin = () => {
    router.replace("/sign-in");
  };
  return (
    <AuthModal>
      {success ? (
        <View className="items-center mt-9 h-[40vh] justify-center">
          <Text className="font-pregular text-2xl text-center mb-9">
            {i18n.t("registerSuccesfully")}
          </Text>

          <CustomButton
            isLoading={isSubmitting}
            label={i18n.t("signIn")}
            theme="auth"
            onPress={goToLogin}
          />
        </View>
      ) : (
        <>
          <ScrollView className="w-full  mb-4">
            <FormField
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              placeholder={i18n.t("name")}
            />
            <FormField
              value={form.lastName}
              handleChangeText={(e) => setForm({ ...form, lastName: e })}
              placeholder={i18n.t("lastName")}
            />
            <FormField
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              placeholder={i18n.t("email")}
              keyboardType="email-address"
            />
            <FormField
              value={form.nickname}
              handleChangeText={(e) => setForm({ ...form, nickname: e })}
              placeholder={i18n.t("nickname")}
            />
            <FormField
              value={form.gender}
              handleChangeText={(e) => setForm({ ...form, gender: e })}
              placeholder={i18n.t("gender")}
            />
            <FormField
              value={form.password}
              placeholder={i18n.t("password")}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              type="password"
            />
            <FormField
              value={form.confirmPassword}
              placeholder={i18n.t("confirmPassword")}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
              otherStyles="mb-5"
              type="password"
            />
          </ScrollView>

          <CustomButton
            isLoading={isSubmitting}
            label={i18n.t("register")}
            theme="auth"
            onPress={submit}
          />
          <View className="items-center mt-9">
            <Text className="font-pregular">{i18n.t("haveAnAccount")}</Text>
            <Link
              className="font-pbold text-black underline text-lg"
              href="/sign-in"
            >
              {i18n.t("signIn")}
            </Link>
          </View>
        </>
      )}
    </AuthModal>
  );
}

const styles = StyleSheet.create({});
