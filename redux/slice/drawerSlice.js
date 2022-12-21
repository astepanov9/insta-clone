import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer(state, action) {
      state.isOpen = action.payload;
    },
    closeDrawer(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
