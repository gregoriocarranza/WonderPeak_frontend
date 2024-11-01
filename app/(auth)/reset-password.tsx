import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AuthModal from "@/components/AuthModal";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";

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
            Muchas gracias! Te llegaráa un mail para recuperar tu contraseña
          </Text>

          <CustomButton
            isLoading={isSubmitting}
            label="Ir al inicio"
            theme="auth"
            onPress={goToHome}
          />
        </View>
      ) : (
        <>
          <View className="items-center mt-9">
            <Text className="font-pregular text-2xl text-center">
              Ingresa tu email para que podamos enviarte un link de recuperación
            </Text>
          </View>

          <FormField
            value={form.email}
            handleChangeText={(e) => setForm({ email: e })}
            placeholder="Email"
            keyboardType="email-address"
            otherStyles="mb-9"
          />

          <CustomButton
            isLoading={isSubmitting}
            label="Aceptar"
            theme="auth"
            onPress={submit}
          />
        </>
      )}
    </AuthModal>
  );
}

const styles = StyleSheet.create({});
