import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // ✅ localStorage ke liye correct import
import { persistStore, persistReducer } from "redux-persist"; // ✅ missing imports fix
import authReducer from "./reducer/authReducer";

// Apne reducers yahan add karein
const rootReducer = combineReducers({
  authStore: authReducer,
});

// ✅ persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// ✅ persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ persist store
export const persistor = persistStore(store);
