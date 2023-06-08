import { configureStore } from '@reduxjs/toolkit';
import {breadcrumbSlice} from './user/slices/breadcrumbs/breadcrumbSlice';
import {DocumentSlice} from './user/slices/documents/documentSlice';
 import userSlice from './user/slices/user/userSlice';
 

export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      breadcrumbs: breadcrumbSlice.reducer,
      document: DocumentSlice.reducer
  },
})