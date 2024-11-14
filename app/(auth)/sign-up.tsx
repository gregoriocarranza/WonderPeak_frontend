import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import i18n from "@/languages";

type FormState = {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  gender: string;
};
type ValidateState = {
  confirmPassword: string;
};


export default function SignUp() {
  const [form, setForm] = useState<FormState>({
    name: "",
    lastname: "",
    nickname: "",
    email: "",
    gender: "",
    password: "",
  });
  const [confirmPassword, setconfirmPassword] = useState<ValidateState>({ confirmPassword: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const showAlert = (titleKey: string, bodyKey: string): void => {
    const title = i18n.t(titleKey);
    const body = i18n.t(bodyKey);

    Alert.alert(title, body);
  };

  const validatePasswords = (): boolean => {
    console.log(form.password)
    console.log(confirmPassword.confirmPassword)
    return form.password === confirmPassword.confirmPassword;
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

  // Función para hacer la llamada a la API
  const registerUser = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://wonderpeak.uade.susoft.com.ar/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      const data = await response.json();
      setSuccess(true);
      showAlert("success", "registerSuccesfully");
    } catch (error) {
      showAlert("error", "errorRegistering");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modificar submit para usar registerUser
  const submit = (): void => {
    setIsSubmitting(true);
    if (!validateFormField()) {
      setIsSubmitting(false);
      return;
    }
    registerUser();
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
              value={form.lastname}
              handleChangeText={(e) => setForm({ ...form, lastname: e })}
              placeholder={i18n.t("lastName")}
            />
            <FormField
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              placeholder={i18n.t("email")}
              keyboardType="email-address"
            />
            <FormField
              value={form.gender}
              handleChangeText={(e) => setForm({ ...form, gender: e })}
              placeholder={i18n.t("gender")}
            />
            <FormField
              value={form.nickname}
              handleChangeText={(e) => setForm({ ...form, nickname: e })}
              placeholder={i18n.t("nickname")}
            />
            <FormField
              value={form.password}
              placeholder={i18n.t("password")}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              type="password"
            />
            <FormField
              value={confirmPassword.confirmPassword}
              placeholder={i18n.t("confirmPassword")}
              handleChangeText={(e) => setconfirmPassword({ ...confirmPassword, confirmPassword: e })}
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

