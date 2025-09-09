import { I18n, TranslateOptions } from "i18n-js";
import { detectDeviceLanguage, NestedKeyOf } from "@/utils";
import enTranslations from "./locales/en.json";
import trTranslations from "./locales/tr.json";

export type TranslationKeys = NestedKeyOf<typeof enTranslations>;
export type TranslationFunction = (
  _key: TranslationKeys,
  _options?: TranslateOptions
) => string;
export const translations = { en: enTranslations, tr: trTranslations };

export const i18n = new I18n(translations);

export const deviceLanguage = detectDeviceLanguage();
i18n.locale = deviceLanguage;
i18n.enableFallback = true;
