import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './user/apis/TodosApi';
import { userSlice } from './user/slices/user/userSlice';
import {breadcrumbSlice} from './user/slices/breadcrumbs/breadcrumbSlice';
import {DocumentSlice} from './user/slices/documents/documentSlice';

export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      breadcrumbs: breadcrumbSlice.reducer,
      [todosApi.reducerPath]: todosApi.reducer,
      document: DocumentSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat( todosApi.middleware )
})