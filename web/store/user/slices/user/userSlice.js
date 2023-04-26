import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
       
        user: "",
        isLoading: false,
    },
    reducers: {
        startLoadingUsers: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setLoginUser: ( state, action ) => {
            state.isLoading = false;
            state.user = action.payload.user;
           
        }
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingUsers, setLoginUser } = userSlice.actions;