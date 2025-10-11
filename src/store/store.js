//Kho chứa các slide Redux

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import authReducer from '../features/auth/authSlice';
import urlReducer from '../features/url/urlSlice';
import volumeReducer from '../features/volume/volumeSlice';
import autoScrollReducer from '../features/autoScroll/autoScrollSlice';
import languageReducer from '../features/language/languageSlice';
import listVideoReducer from '../features/video/listVideoSlice';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: [
    'isAuth',
    'isLoading',
    'currentUser',
    'component',
    'redirectAfterLogin',
  ],
};

const urlConfig = {
  key: 'url',
  storage,
};

const volumeConfig = {
  key: 'volume',
  storage,
  whitelist: ['volume'],
};

const autoScrollConfig = {
  key: 'autoScroll',
  storage,
  whitelist: ['autoScroll'],
};

const languageConfig = {
  key: 'language',
  storage,
  whitelist: ['language'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  url: persistReducer(urlConfig, urlReducer),
  volume: persistReducer(volumeConfig, volumeReducer),
  autoScroll: persistReducer(autoScrollConfig, autoScrollReducer),
  language: persistReducer(languageConfig, languageReducer),
  listVideo: listVideoReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export const persistor = persistStore(store);
export default store;
