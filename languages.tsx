import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "@/languages/en.json";
import es from "@/languages/es.json";

const translations = {
  en,
  es,
};

export const handleLanguage = (languageCode = "es") => {
  i18n.locale = languageCode;
  try {
    AsyncStorage.setItem("userLanguage", languageCode);
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
};

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode || "es";
i18n.defaultLocale = "es";
i18n.enableFallback = true;

export default i18n;
