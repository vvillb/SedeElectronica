import { createSlice } from '@reduxjs/toolkit';

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: [],
  reducers:{
    addBreadcrumbs(state,action){
      const{label}=action.payload;
      const path=window.location.pathname;
      state.push({path,label});
    },
    clearBreadcrumbs(state){
      state.splice(0,state.length);
    },
    popBreadcrumb(state) {
      state.pop();
    },

    }
  });




//   reducers: {
//     pushRoute: (state, action) => {
//       state.push(action.payload);
//     },
//     popBreadcrumb: (state) => {
//         state.pop();
//   },
//   clearBreadcrumbs: (state) => {
//     state = [];
//   },
// },
// });

export const { addBreadcrumbs, popBreadcrumb, clearBreadcrumbs  } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
