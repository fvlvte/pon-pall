import React from "react";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Gra } from "./Gra";
import pl from "./translations/pl.json";
import { MainView } from "./src/MainView";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      pl: {
        translation: pl
      }
    },
    lng: "pl",
    fallbackLng: "pl",
    interpolation: {
      escapeValue: false
    }
});

export const App = () => {
    return <MainView/>;
}