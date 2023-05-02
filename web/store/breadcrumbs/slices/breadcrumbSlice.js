import { createSlice } from '@reduxjs/toolkit';

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: [],
  reducers: {
    pushRoute: (state, action) => {
      state.push(action.payload);
    },
    popBreadcrumb: (state) => {
        state.pop();
  },
  clearBreadcrumbs: (state) => {
    state = [];
  },
},
});

export const { pushRoute, popBreadcrumb, clearBreadcrumbs  } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
