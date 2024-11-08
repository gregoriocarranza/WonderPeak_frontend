import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import i18n from "@/languages";

type FormState = {
  password: string;
  confirmPassword: string;
};

export default function SetPassword() {
  const [form, setForm] = useState<FormState>({
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      goToHome();
    }, 2000);
  };

  const goToHome = () => {
    router.replace("/");
  };

  return (
    <AuthModal>
      <FormField
        title={i18n.t("newPassword")}
        value={form.password}
        placeholder={i18n.t("password")}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        otherStyles="mb-9"
        type="password"
      />
      <FormField
        title={i18n.t("repetPassword")}
        value={form.confirmPassword}
        placeholder={i18n.t("repetPassword")}
        handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
        otherStyles="mb-9"
        type="password"
      />

      <CustomButton
        isLoading={isSubmitting}
        label={i18n.t("accept")}
        theme="auth"
        onPress={submit}
      />
    </AuthModal>
  );
}

const styles = StyleSheet.create({});
