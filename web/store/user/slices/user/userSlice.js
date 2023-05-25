import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosService from '../../../../src/services/axiosService';
import { setToken, removeToken } from '../../../../src/services/axiosService';

export const getLoginUser = createAsyncThunk(
  'user/login',
  async ( {certificadoFirma, firma}, thunkAPI) => {
    try {
      const {data} = await axiosService.axiosInstance.post('/Login', {
        CertificadoFirma: certificadoFirma,
        Mensaje:firma,
        
      });
      return data;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState:{
    entities: [],
    user: "",
  isLoading: false,
  autenticado: false,
  loginStatus: 'idle',
  },
  reducers: {
    startLoadingUsers: (state) => {
      console.log('startloadinguser')
      state.isLoading = true;
    },
    setLoginUser: (state, action) => {
      console.log('setloginuser')
      state.isLoading = false;
      state.user = action.payload;
      state.autenticado = true;
      setToken(action.payload.tokenJWT);
    },
    setLogoutUser: (state) => {
      state.user = "";
      state.isLoading = false;
      state.autenticado = false;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginUser.pending, (state) => {
        state.isLoading = true;
        state.loginStatus = 'loading';
        console.log('is pending')
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.autenticado = true;
        setToken(action.payload.tokenJWT);
        state.loginStatus = 'succeeded';
        console.log('fulfilled')
        
      })
      .addCase(getLoginUser.rejected, (state) => {
        state.isLoading = false;
        state.loginStatus = 'failed';
      });
  },
});

export const { startLoadingUsers, setLoginUser, setLogoutUser } = userSlice.actions;

export default userSlice;
