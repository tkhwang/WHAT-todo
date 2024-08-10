import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ko from "@/constants/locales/ko.json";
import en from "@/constants/locales/en.json";

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    debug: true,
    lng: savedLanguage ?? "ko",
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ko: { translation: ko },
      en: { translation: en },
    },
  });
};

initI18n();

export default i18n;
