import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './features/usersApi';
import homesReducer from './features/homesSlice';

export const store = configureStore({
  reducer: {
    homes: homesReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
