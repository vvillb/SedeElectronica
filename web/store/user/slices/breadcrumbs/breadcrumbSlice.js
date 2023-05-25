import { createSlice } from '@reduxjs/toolkit';

export const breadcrumbSlice = createSlice({
  name: 'breadcrumbs',
  initialState: [],
  reducers:{
    addBreadcrumbs(state,action){
      const{label}=action.payload;
      const path=window.location.pathname;
      if (!(state.length>0 && state[state.length - 1].path===path)){
        state.push({path,label});
      }
    },
    clearBreadcrumbs(state){
      state.splice(0,state.length);
    },
    popBreadcrumb(state) {
      state.pop();
    },}});
    
export const { addBreadcrumbs, popBreadcrumb, clearBreadcrumbs  } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;

