import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './en/common.json';
import viCommon from './vi/common.json';
import arCommon from './ar/common.json';
import enMoreDrawer from './en/moreDrawer.json';
import viMoreDrawer from './vi/moreDrawer.json';
import arMoreDrawer from './ar/moreDrawer.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      moreDrawer: enMoreDrawer,
    },
    vi: {
      common: viCommon,
      moreDrawer: viMoreDrawer,
    },
    ar: {
      common: arCommon,
      moreDrawer: arMoreDrawer,
    },
  },
  lng: 'vi',
  fallbackLng: 'en',
  ns: ['common', 'home'],
  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
