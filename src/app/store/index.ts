import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { authReducer } from "./auth-slice";
import { tasksReducer } from "./tasks-slice";

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const tasksPersistConfig = {
  key: 'tasks',
  storage,
  whitelist: ['tasks'],
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const tasksPersistedReducer = persistReducer(tasksPersistConfig, tasksReducer);

const rootReducer = combineReducers({
  auth: authPersistedReducer,
  tasks: tasksPersistedReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;