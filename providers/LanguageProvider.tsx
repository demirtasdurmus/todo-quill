import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TranslateOptions } from "i18n-js";
import {
  deviceLanguage,
  i18n,
  TranslationFunction,
  TranslationKeys,
} from "@/i18n";
import { Language, loadLanguage, saveLanguage } from "@/services/storage";

export type LanguageContextType = {
  language: Language;
  setLanguage: (_language: Language) => void;
  isLoaded: boolean;
  t: TranslationFunction;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(deviceLanguage);
  const [isLoaded, setIsLoaded] = useState(false);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    i18n.locale = newLanguage;
  };

  /**
   * @notice We can expose other advanced localization methods from i18n-js here.
   * @example
   * const n = useMemo(
   *   () => (input: number, options?: Partial<FormatNumberOptions>) =>
   *     i18n.formatNumber(input, options) || input,
   *   [language]
   * );
   */
  const t = useMemo(
    () => (key: TranslationKeys, options?: TranslateOptions) =>
      i18n.t(key, options) || key,
    [language]
  );

  useEffect(() => {
    loadLanguage().then((savedLanguage) => {
      const languageToUse = savedLanguage;

      if (languageToUse) {
        setLanguageState(languageToUse);
        i18n.locale = languageToUse;
      }

      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveLanguage(language);
      i18n.locale = language;
    }
  }, [language, isLoaded]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isLoaded,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
