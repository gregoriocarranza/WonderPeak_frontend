import { I18n } from "i18n-js";
import en from "@/languages/en.json";
import es from "@/languages/es.json";

const translations = {
  en,
  es,
};

const i18n = new I18n(translations);
i18n.locale = "es";
i18n.defaultLocale = "es";
i18n.enableFallback = true;

export default i18n;
