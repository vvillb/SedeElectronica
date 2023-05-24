import { createSlice } from '@reduxjs/toolkit';

export const notificationslice = createSlice({
    name: 'document',
    initialState: {
      // data: "",
      isLoading: false,
      contenidoNotificacion: "",
    },
    reducers: {
      startLoadingNotifications: (state) => {
        state.isLoading = true;
      },
      setDocument: (state, action) => {
        console.log('payload: ', action.payload)
        state.isLoading = false;
        // state.data = action.payload;
        state.contenidoNotificacion=action.payload.contenidoNotificacion;
      },
      setContenidoNotificacion: (state, action) => {
        state.contenidoNotificacion = action.payload;
      },
    },
  });
  
  export const { startLoadingNotifications, setDocument,setContenidoNotificacion } = notificationslice.actions;
  
  