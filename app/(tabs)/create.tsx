import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CreatePostComponent from "@/components/createPost/CreatePostComponent";
import SettingsPostComponent from "@/components/createPost/SettingsPostComponent";
import { Colors } from "@/constants/Colors";

type SelectedImage = {
  uri: string;
  type: string | undefined;
};

type Step = "create" | "settings";

export default function Create() {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [step, setStep] = useState<Step>("create");

  const goToSettings = (data: SelectedImage[]): void => {
    setSelectedImages(data);
    setStep("settings");
  };

  const goToCreate = () => {
    setStep("create");
  };

  const publishPost = () => {
    goToCreate();
    setSelectedImages([]);
  };

  return (
    <SafeAreaView
      className="flex-1 justify-between p-0"
      style={{ backgroundColor: Colors.white }}
    >
      <StatusBar style="dark" />

      {step === "create" && <CreatePostComponent goToSettings={goToSettings} />}
      {step === "settings" && (
        <SettingsPostComponent
          goBack={goToCreate}
          data={selectedImages}
          publish={publishPost}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
