import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import transactionsReducer from "./transactionsReducer";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  transactions: persistReducer(persistConfig, transactionsReducer)
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;

export const persistor = persistStore(store);
