import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AlertError } from '../apis/interfaces';

export interface communState {
    isOpenInscription: boolean;
    mainSection : number;
    alertError : AlertError;
}

const initialState: communState = {
    isOpenInscription : false,
    mainSection : 0,
    alertError : {
      isErrorAlert : false,
      alertErrorType : '',
      alertErrorMessage : '', 
    }
}

export const communSlice = createSlice({
  name: 'commun',
  initialState,
  reducers: {
    openInscription: (state, action: PayloadAction<boolean>) => {
      state.isOpenInscription = action.payload;
    },
    selectMainSection: (state, action: PayloadAction<number>) => {
        state.mainSection = action.payload;
    },
    setAlertError: (state, action: PayloadAction<AlertError>) => {
      state.alertError = action.payload;
    },
   
  },
})

export const { openInscription, selectMainSection, setAlertError } = communSlice.actions

export default communSlice.reducer