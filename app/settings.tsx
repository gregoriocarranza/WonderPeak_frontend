import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import HeaderUser from "@/components/HeaderUser";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import i18n from "@/languages";
import CustomButton from "@/components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import ConfirmationModal from "@/components/ConfirmationModal";
import FormSelect from "@/components/FormSelect";

type FormState = {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  gender: string;
  description: string;
};

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const FORM_TYPES = {
  general: "general",
  password: "password",
} as const;

type FormTypes = (typeof FORM_TYPES)[keyof typeof FORM_TYPES];

export default function Settings() {
  const [generalForm, setGeneralForm] = useState<FormState>({
    name: "",
    lastname: "",
    nickname: "",
    email: "",
    gender: "",
    description: "",
  });
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [formType, setFormType] = useState<FormTypes>(FORM_TYPES.general);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    useState<boolean>(false);

  const goBack = () => {
    if (formType === FORM_TYPES.password) {
      setIsOpenConfirmationModal(true);
    } else {
      router.back();
    }
  };

  const confirmAction = () => {
    setFormType(FORM_TYPES.general);
    setIsOpenConfirmationModal(false);
  };

  const handleForm = () => {};

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <HeaderUser
          isOwner={false}
          showGoBack={true}
          showDetails={false}
          goBackAction={goBack}
        />
        <ScrollView style={styles.formContainer}>
          {formType === FORM_TYPES.general ? (
            <>
              <View className="px-6">
                <FormField
                  title={i18n.t("name")}
                  value={generalForm.name}
                  handleChangeText={(e) =>
                    setGeneralForm({ ...generalForm, name: e })
                  }
                  placeholder={i18n.t("name")}
                  otherStyles="mb-4"
                />
                <FormField
                  title={i18n.t("lastName")}
                  value={generalForm.lastname}
                  handleChangeText={(e) =>
                    setGeneralForm({ ...generalForm, lastname: e })
                  }
                  placeholder={i18n.t("lastName")}
                  otherStyles="mb-4"
                />
                <FormField
                  title={i18n.t("nickname")}
                  value={generalForm.nickname}
                  handleChangeText={(e) =>
                    setGeneralForm({ ...generalForm, nickname: e })
                  }
                  placeholder={i18n.t("nickname")}
                  otherStyles="mb-4"
                />
                <FormField
                  title={i18n.t("email")}
                  value={generalForm.email}
                  handleChangeText={(e) =>
                    setGeneralForm({ ...generalForm, email: e })
                  }
                  placeholder={i18n.t("email")}
                  otherStyles="mb-4"
                />
                <FormSelect
                  handleChange={(e) =>
                    setGeneralForm({ ...generalForm, email: e })
                  }
                />
              </View>

              <View className="pt-4 pl-4">
                <Pressable
                  onPress={() => setFormType(FORM_TYPES.password)}
                  style={styles.actionButton}
                  className="mb-3"
                >
                  <MaterialIcons name="password" size={24} color="black" />
                  <Text
                    style={styles.actionText}
                    className="ml-4 font-pregular"
                  >
                    {i18n.t("editPassword")}
                  </Text>
                </Pressable>
                <Pressable style={styles.actionButton} className="mb-4">
                  <MaterialIcons name="logout" size={24} color="black" />
                  <Text
                    style={styles.actionText}
                    className="ml-4 font-pregular"
                  >
                    {i18n.t("logout")}
                  </Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.dangerAction]}>
                  <MaterialIcons name="close" size={24} color={Colors.red} />
                  <Text
                    style={styles.dangerText}
                    className="ml-4 font-pregular"
                  >
                    {i18n.t("deleteAccount")}
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <View className="px-6">
              <FormField
                title={i18n.t("currentPassword")}
                value={generalForm.name}
                handleChangeText={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e })
                }
                placeholder="********"
                otherStyles="mb-4"
              />
              <FormField
                title={i18n.t("newPassword")}
                value={generalForm.name}
                handleChangeText={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e })
                }
                placeholder="********"
                otherStyles="mb-4"
              />
              <FormField
                title={i18n.t("repetPassword")}
                value={generalForm.lastname}
                handleChangeText={(e) =>
                  setPasswordForm({ ...passwordForm, newPasswordConfirm: e })
                }
                placeholder="********"
                otherStyles="mb-4"
              />
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <CustomButton
            label={i18n.t("save")}
            theme="primary"
            onPress={handleForm}
          />
        </View>
      </SafeAreaView>

      {isOpenConfirmationModal && (
        <ConfirmationModal
          cancelAction={() => setIsOpenConfirmationModal(false)}
          confirmAction={confirmAction}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 24,
    paddingTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    padding: 4,
    paddingHorizontal: 12,
    width: 200,
    borderColor: Colors.gray,
    borderRadius: 24,
  },
  actionText: {
    color: Colors.gray,
  },
  formContainer: {},
  dangerAction: {
    borderColor: Colors.red,
  },
  dangerText: {
    color: Colors.red,
  },
});
