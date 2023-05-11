import { createSlice } from '@reduxjs/toolkit';
import axiosService from '../../../../src/services/axiosService';
import { setToken, removeToken } from '../../../../src/services/axiosService';




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
            console.log('action.payload:',action.payload);
            setToken(action.payload.tokenJWT)
           
        },
        setLogoutUser: (state) => {
            state.user = "";
            state.isLoading = false;
            state.autenticado = false;
            removeToken();
        },
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingUsers, setLoginUser , setLogoutUser} = userSlice.actions;
export default userSlice.reducer;