import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import i18n from "@/languages";

type FormState = {
  email: string;
};

export default function ResetPassword() {
  const [form, setForm] = useState<FormState>({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const submit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const goToHome = () => {
    router.replace("/");
  };

  return (
    <AuthModal>
      {submitted ? (
        <View className="items-center mt-9 h-[40vh] justify-center">
          <Text className="font-pregular text-2xl text-center mb-9">
            {i18n.t("resetPasswordSent")}
          </Text>

          <CustomButton
            isLoading={isSubmitting}
            label={i18n.t("goHome")}
            theme="auth"
            onPress={goToHome}
          />
        </View>
      ) : (
        <>
          <View className="items-center mt-9">
            <Text className="font-pregular text-2xl text-center">
              {i18n.t("resetPasswordInstruction")}
            </Text>
          </View>

          <FormField
            value={form.email}
            handleChangeText={(e) => setForm({ email: e })}
            placeholder={i18n.t("email")}
            keyboardType="email-address"
            otherStyles="mb-9"
          />

          <CustomButton
            isLoading={isSubmitting}
            label={i18n.t("accept")}
            theme="auth"
            onPress={submit}
          />
        </>
      )}
    </AuthModal>
  );
}

const styles = StyleSheet.create({});
