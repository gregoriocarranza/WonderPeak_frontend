import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { Link } from "expo-router";

type FormState = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = () => {};

  return (
    <AuthModal>
      <FormField
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        placeholder="Email"
        keyboardType="email-address"
      />
      <FormField
        value={form.password}
        placeholder="Password"
        handleChangeText={(e) => setForm({ ...form, password: e })}
        otherStyles="mb-3"
        type="password"
      />
      <View className="w-full">
        <Link
          className="font-psemibold text-black underline mb-9 text-right"
          href="/reset-password"
        >
          Olvidé mi contraseña
        </Link>
      </View>
      <CustomButton
        isLoading={isSubmitting}
        label="Aceptar"
        theme="auth"
        onPress={submit}
      />
      <View className="items-center mt-9">
        <Text className="font-pregular">No tienes una cuenta?</Text>
        <Link
          className="font-pbold text-black underline text-lg"
          href="/sign-up"
        >
          Registrate
        </Link>
      </View>
    </AuthModal>
  );
}

const styles = StyleSheet.create({});
