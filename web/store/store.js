import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slices/user/userSlice';
import {breadcrumbSlice} from './user/slices/breadcrumbs/breadcrumbSlice';
import {DocumentSlice} from './user/slices/documents/documentSlice';
import {popupSlice} from './user/slices/popUps/popupSlice';

export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      breadcrumbs: breadcrumbSlice.reducer,
      document: DocumentSlice.reducer,
      popup:popupSlice.reducer
  },
})