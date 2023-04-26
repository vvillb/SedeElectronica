import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './user/apis/TodosApi';
import { userSlice } from './user/slices/user/userSlice';

export const store = configureStore({
  reducer: {
      user: userSlice.reducer,

      [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat( todosApi.middleware )
})