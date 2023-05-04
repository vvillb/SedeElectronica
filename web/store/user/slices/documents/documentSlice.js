import { createSlice } from '@reduxjs/toolkit';

export const DocumentSlice = createSlice({
    name: 'document',
    initialState: {
      data: null,
      isLoading: false,
      contenidoPDF: "",
    },
    reducers: {
      startLoadingDocuments: (state) => {
        state.isLoading = true;
      },
      setDocument: (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      },
      setContenidoPDF: (state, action) => {
        state.contenidoPDF = action.payload;
      },
    },
  });
  
  export const { startLoadingDocuments, setDocument,setContenidoPDF } = DocumentSlice.actions;
  
  