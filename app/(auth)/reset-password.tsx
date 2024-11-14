import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { router } from "expo-router";
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
    resetPassword();
  };

  const resetPassword = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://wonderpeak.uade.susoft.com.ar/api/auth/forgot_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Error al resetear el usuario");
      }
      const data = await response.json();
      console.log(data)

      if (data.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const goBack = () => {
    router.replace("/sign-in");
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

          <View className="mt-4">
            <Pressable onPress={goBack}>
              <Text className="font-pregular text-xl underline">
                {i18n.t("goBack")}
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </AuthModal>
  );
}

const styles = StyleSheet.create({});
