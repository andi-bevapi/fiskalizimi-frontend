import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import shqip from "./locales/shqip.json";
import english from "./locales/english.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    fallbackLng: "sq",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ",",
    },
    lng:"sq",
    resources: {
      en: {
        translations: english,
      },
      sq: {
        translations: shqip,
      },
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false, // we use content as keys
    
    react: {
      wait: true,
      useSuspense: false
    },
  });
export default i18n;
