import { configureStore } from '@reduxjs/toolkit';
import modalSlice from '../redux/slice/modalSlice';
import drawerSlice from '../redux/slice/drawerSlice';

export const store = configureStore({
  reducer: {
    modalSlice,
    drawerSlice,
  },
});
