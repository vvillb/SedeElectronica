import { createSlice } from '@reduxjs/toolkit';

export const breadcrumbSlice = createSlice({
  name: 'breadcrumbs',
  initialState: [],
  reducers:{
    addBreadcrumbs(state,action){
      const t0=performance.now();
      console.log('t0(antes de despachar)',t0)


      const{label}=action.payload;
      const path=window.location.pathname;
      const pathArray=path.split("/");
      const ubi=pathArray[pathArray.length-1]
      if (!(state.length>0 && state[state.length - 1].path===path)){
        state.push({path,ubi,label});
      }

      const t1=performance.now();
      console.log('t1(después de despachar)',t1)
      console.log('tiempo de la acción:',t1-t0)
    },
    clearBreadcrumbs(state){
      state.splice(0,state.length);
    },
    popBreadcrumb(state) {
      state.pop();
    },}});
    
export const { addBreadcrumbs, popBreadcrumb, clearBreadcrumbs  } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;

