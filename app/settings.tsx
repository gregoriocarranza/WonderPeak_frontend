import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import i18n from "@/languages";
import { useAuth } from "@/hooks/authContext";
import {
  deleteUser,
  updateUser,
  updateUserPassword,
} from "@/services/userServices";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import ConfirmationModal from "@/components/ConfirmationModal";
import FormSelect from "@/components/FormSelect";
import GlobalLoading from "@/components/GlobalLoading";
import HeaderSetttings from "@/components/HeaderSetttings";
import { FormState, SendFormState } from "@/types/interfaces";
import { useLanguage } from "@/hooks/languageContext";
import { genderData } from "@/utils";
import { getMediaType } from "@/utils/getMediaType";

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

type ConfirmationModalBody = {
  title: string;
  text: string;
};

const FORM_TYPES = {
  general: "general",
  password: "password",
} as const;

const languageData = [
  { label: i18n.t("spanish"), value: "es" },
  { label: i18n.t("english"), value: "en" },
];

type FormTypes = (typeof FORM_TYPES)[keyof typeof FORM_TYPES];

export default function Settings() {
  const { userInfo, logout, userMe } = useAuth();
  const userData = userInfo ? JSON.parse(userInfo) : null;

  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModalBody>({
      title: "",
      text: "String",
    });
  const [generalForm, setGeneralForm] = useState<SendFormState>({
    name: userData?.name || "",
    lastname: userData?.lastname || "",
    nickname: userData?.nickname || "",
    email: userData?.email || "",
    gender: userData?.gender || "",
    bio: userData?.description || "",
    profileImage: userData?.profileImage || "",
    coverImage: userData?.coverImage || "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [formType, setFormType] = useState<FormTypes>(FORM_TYPES.general);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  const goBack = () => {
    if (formType === FORM_TYPES.password) {
      setIsOpenConfirmationModal(true);
      setConfirmationModal({
        title: i18n.t("areYouSureToExit"),
        text: i18n.t("youWillLoseYourChanges"),
      });
    } else {
      router.back();
    }
  };

  const confirmAction = () => {
    formType === FORM_TYPES.password
      ? setFormType(FORM_TYPES.general)
      : confirmDeleteAccount();

    setIsOpenConfirmationModal(false);
  };

  const handleImage = (type: "profileImage" | "coverImage", image: string) => {
    setGeneralForm({ ...generalForm, [type]: image });
  };

  const handleForm = async () => {
    if (formType === "password") {
      handleFormPassword();
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", generalForm.name);
      formData.append("lastname", generalForm.lastname);
      formData.append("nickname", generalForm.nickname);
      formData.append("bio", generalForm.bio);
      formData.append("gender", generalForm.gender);

      // Convertir las URLs de imágenes a archivos si existen
      if (generalForm.profileImage) {
        const fileUri = generalForm.profileImage;
        const fileType = getMediaType(fileUri);
        const fileName = fileUri.split("/").pop() || "upload";

        formData.append("profileUserImage", {
          uri: fileUri,
          type: fileType,
          name: fileName,
        } as any);
        formData.append("multimediaFileType", fileType);
      }

      if (generalForm.coverImage) {
        const fileUri = generalForm.coverImage;
        const fileType = getMediaType(fileUri);
        const fileName = fileUri.split("/").pop() || "upload";

        formData.append("profileCoverImage", {
          uri: fileUri,
          type: fileType,
          name: fileName,
        } as any);
        formData.append("multimediaFileType", fileType);
      }

      const response = await updateUser(formData);
      userMe(response.data);
      Alert.alert(i18n.t("successfulModification"));
    } catch (error) {
      Alert.alert(i18n.t("errorUpdatingUser"));
      console.error("Error updating user", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    goToSingIn();
  };

  const deleteAccount = () => {
    setIsOpenConfirmationModal(true);
    setConfirmationModal({
      title: i18n.t("deleteAccount"),
      text: i18n.t("areYouSureDeleleAccount"),
    });
  };

  const confirmDeleteAccount = async () => {
    try {
      setIsLoading(true);
      await deleteUser();
      goToSingIn();
    } catch (error) {
      console.error("Error deleting account", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSingIn = () => {
    router.replace("/sign-in");
  };

  const areValidsPasswords = () => {
    const areEquals =
      passwordForm.newPassword === passwordForm.newPasswordConfirm;
    if (!areEquals) {
      Alert.alert("Las constraseñas no coinciden");
    }

    return areEquals;
  };

  const handleFormPassword = async () => {
    if (!areValidsPasswords()) return;

    try {
      setIsLoading(true);
      const payload = {
        password: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      };
      const response = await updateUserPassword(payload);
      console.log(response);

      Alert.alert("Contraseña modificada correctamente");
    } catch (error) {
      Alert.alert(
        "No pudimos actualizar su contraseña",
        "Verifique que su contraseña actual sea correcta"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <GlobalLoading />}
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <HeaderSetttings
          goBackAction={goBack}
          temporalData={{ ...generalForm, description: generalForm.bio }}
          handleImage={handleImage}
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
                  isReadOnly
                  handleChangeText={() => {}}
                  placeholder={i18n.t("email")}
                  otherStyles="mb-4"
                />
                <FormField
                  title={i18n.t("description")}
                  value={generalForm.bio}
                  handleChangeText={(e) =>
                    setGeneralForm({ ...generalForm, bio: e })
                  }
                  placeholder={i18n.t("description")}
                  otherStyles="mb-4"
                />
                <FormSelect
                  data={genderData}
                  initialValue={generalForm.gender}
                  placeholder={i18n.t("gender")}
                  title={i18n.t("gender")}
                  handleChange={(e) =>
                    setGeneralForm({ ...generalForm, gender: e })
                  }
                />
                <View className="mt-4">
                  <FormSelect
                    data={languageData}
                    placeholder={i18n.t("language")}
                    title={i18n.t("language")}
                    handleChange={handleLanguageChange}
                    initialValue={currentLanguage}
                  />
                </View>
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
                <Pressable
                  style={styles.actionButton}
                  className="mb-4"
                  onPress={handleLogout}
                >
                  <MaterialIcons name="logout" size={24} color="black" />
                  <Text
                    style={styles.actionText}
                    className="ml-4 font-pregular"
                  >
                    {i18n.t("logout")}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, styles.dangerAction]}
                  onPress={deleteAccount}
                >
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
                value={passwordForm.currentPassword}
                handleChangeText={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e })
                }
                placeholder="********"
                otherStyles="mb-4"
                type="password"
              />
              <FormField
                title={i18n.t("newPassword")}
                value={passwordForm.newPassword}
                handleChangeText={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e })
                }
                placeholder="********"
                otherStyles="mb-4"
                type="password"
              />
              <FormField
                title={i18n.t("repetPassword")}
                value={passwordForm.newPasswordConfirm}
                handleChangeText={(e) =>
                  setPasswordForm({ ...passwordForm, newPasswordConfirm: e })
                }
                placeholder="********"
                otherStyles="mb-4"
                type="password"
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
          title={confirmationModal.title}
          text={confirmationModal.text}
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
    justifyContent: "center",
    borderWidth: 2,
    padding: 4,
    paddingHorizontal: 12,
    width: 270,
    borderColor: Colors.gray,
    borderRadius: 28,
    height: 60,
  },
  actionText: {
    color: Colors.gray,
  },
  formContainer: {
    marginTop: 16,
  },
  dangerAction: {
    borderColor: Colors.red,
  },
  dangerText: {
    color: Colors.red,
  },
});
