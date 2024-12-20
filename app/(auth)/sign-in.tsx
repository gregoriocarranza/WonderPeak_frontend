import { StyleSheet, View, Text, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import i18n from "@/languages";
import { useAuth } from "@/hooks/authContext";

type FormState = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { login } = useAuth();
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const goToDashboard = () => {
    router.replace("/home");
  };

  const signInUser = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://wonderpeak.uade.susoft.com.ar/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Error al logear el usuario");
      }

      const data = await response.json();

      if (data.success && data.data.accessToken) {
        await login(data.data.accessToken); // Guarda el token en el contexto
        goToDashboard();
      } else {
        Alert.alert("Error", "No se recibió un token de autenticación.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Hubo un problema al iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submit = () => {
    if (!form.email || !form.password) {
      Alert.alert("Campos incompletos", "Por favor, complete todos los campos");
      return;
    }

    signInUser();
  };

  return (
    <AuthModal>
      <FormField
        value={form.email}
        placeholder={i18n.t("email")}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        keyboardType="email-address"
      />
      <FormField
        value={form.password}
        placeholder={i18n.t("password")}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        keyboardType="ascii-capable"
        otherStyles="mb-3"
        type="password"
      />
      <View className="w-full">
        <Link
          className="font-psemibold text-black underline mb-9 text-right self-end"
          href="/reset-password"
        >
          {i18n.t("forgotPassword")}
        </Link>
        {/* <Link
          className="font-psemibold text-black underline mb-9 text-right self-end"
          href="/set-password"
        >
          {i18n.t("setNewPassword")}
        </Link> */}
      </View>
      <CustomButton
        isLoading={isSubmitting}
        label={i18n.t("accept")}
        theme="auth"
        onPress={submit}
      />
      <View className="items-center mt-9">
        <Text className="font-pregular">{i18n.t("notHaveAccount")}</Text>
        <Link
          className="font-pbold text-black underline text-lg"
          href="/sign-up"
        >
          {i18n.t("signUp")}
        </Link>
      </View>
    </AuthModal>
  );
}

const styles = StyleSheet.create({});
