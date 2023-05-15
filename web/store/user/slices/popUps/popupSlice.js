// popupSlice.js

import { createSlice } from '@reduxjs/toolkit';



 export const popupSlice=createSlice({
    name:'popup',
    initialState:{
        visible:false,
        message:''
    },
    reducers:{
        showPopup: (state, action) => {
            state.visible = true;
            state.message = action.payload;
          },
          hidePopup: (state) => {
            state.visible = false;
            state.message = '';
          },
    }
})



export const { showPopup, hidePopup } = popupSlice.actions;

//401: no autenticado
//500: no encontrado