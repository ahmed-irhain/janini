import { I18nManager } from "react-native";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar.json";

/**
 * RTL must be set before the root component renders; React Native only
 * re-applies layout direction after a reload, so this runs at module init.
 * Arabic is the only supported language — per docs/plan.md this is an
 * Arabic-first app, not a bilingual one.
 */
if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
  },
  lng: "ar",
  fallbackLng: "ar",
  interpolation: { escapeValue: false },
});

export default i18n;
