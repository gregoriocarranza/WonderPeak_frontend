import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { Link } from "expo-router";

type FormState = {
  name: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [form, setForm] = useState<FormState>({
    name: "",
    lastName: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateFormField = (): boolean => {
    return Object.values(form).every(Boolean);
  };
  const submit = (): void => {
    if (!validateFormField()) {
      Alert.alert("Campos incompletos", "Por favor, complete todos los campos");
    }
  };

  return (
    <AuthModal>
      <ScrollView className="w-full  mb-4">
        <FormField
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          placeholder="Nombre"
        />
        <FormField
          value={form.lastName}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          placeholder="Apellido"
        />
        <FormField
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          placeholder="Email"
          keyboardType="email-address"
        />
        <FormField
          value={form.nickname}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          placeholder="Nickname"
        />
        <FormField
          value={form.password}
          placeholder="Contraseña"
          handleChangeText={(e) => setForm({ ...form, password: e })}
          type="password"
        />
        <FormField
          value={form.confirmPassword}
          placeholder="Confirmar contraseña"
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mb-5"
          type="password"
        />
      </ScrollView>

      <CustomButton
        isLoading={isSubmitting}
        label="Registarme"
        theme="auth"
        onPress={submit}
      />
      <View className="items-center mt-9">
        <Text className="font-pregular">Ya tienes una cuenta?</Text>
        <Link
          className="font-pbold text-black underline text-lg"
          href="/sign-in"
        >
          Inicia sesión
        </Link>
      </View>
    </AuthModal>
  );
}

const styles = StyleSheet.create({});
