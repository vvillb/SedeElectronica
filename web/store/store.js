import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slices/user/userSlice';
import {breadcrumbSlice} from './user/slices/breadcrumbs/breadcrumbSlice';
import {DocumentSlice} from './user/slices/documents/documentSlice';

export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      breadcrumbs: breadcrumbSlice.reducer,
      document: DocumentSlice.reducer
  },
})