import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
       
        user: "",
        isLoading: false,
        autenticado:false,
    },
    reducers: {
        startLoadingUsers: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setLoginUser: ( state, action ) => {
            state.isLoading = false;
            state.user = action.payload;
            state.autenticado=true;
           
        },
        setLogoutUser: (state) => {
            state.user = "";
            state.isLoading = false;
            state.autenticado = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingUsers, setLoginUser , setLogoutUser} = userSlice.actions;
