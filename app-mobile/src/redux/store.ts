import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
