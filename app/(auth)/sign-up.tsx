import { StyleSheet, View, Text } from "react-native";
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
};

export default function SignUp() {
  const [form, setForm] = useState<FormState>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = () => {};

  return (
    <AuthModal>
      {/* <FormField
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        placeholder="Nombre"
      />
      <FormField
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        placeholder="Apellido"
      />
      <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        placeholder="Email"
        keyboardType="email-address"
      />
      <FormField
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        placeholder="Nickname"
      /> */}
      <FormField
        value={form.password}
        placeholder="Contraseña"
        handleChangeText={(e) => setForm({ ...form, password: e })}
        type="password"
      />
      <FormField
        value={form.password}
        placeholder="Confirmar contraseña"
        handleChangeText={(e) => setForm({ ...form, password: e })}
        otherStyles="mb-5"
        type="password"
      />

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
