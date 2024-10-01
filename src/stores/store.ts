import { configureStore } from '@reduxjs/toolkit'
import communReducer from './communSlice';
import profileReducer from './profileSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: { 
    commun: communReducer,
    profile: profileReducer,
    product : productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch