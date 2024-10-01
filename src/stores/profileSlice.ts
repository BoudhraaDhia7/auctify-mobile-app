import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EditProfileForm, LoginForm, UserInfo, UserInfoForm } from '../apis/interfaces';
import { Axios, axiosWithCred } from '../apis/axiosConfig';

export interface ConnexionInfo {
  isLogin: boolean;
  idClient : string;
  pseudo : string;
  token : string;
}


export interface ConnexionInterface {
    isLogin: boolean;
    idClient : string;
    pseudo : string;
    token : string;
    
}

export interface profileState {
    connexionInfo : ConnexionInterface
    profileInfo : UserInfo | null;
    isAddProfile : boolean,
    isSendLogin : boolean,
}

const initialState: profileState = {
    connexionInfo : { isLogin: false, idClient :'', pseudo : '', token : '' },
    profileInfo : null,
    isAddProfile: false,
    isSendLogin : false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<ConnexionInterface>) => {
      state.connexionInfo = action.payload;
    },
    setIsAddProfile: (state, action: PayloadAction<boolean>) => {
      state.isAddProfile = action.payload;
    },
    setIsSendLogin: (state, action: PayloadAction<boolean>) => {
      state.isSendLogin = action.payload;
    },
    setProfileInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.profileInfo = action.payload;
    },
  },
})

export async function userLogin(loginData : LoginForm ): Promise<ConnexionInfo | undefined> {
  try {
      const data = await Axios().post(`auth/login`, loginData );
      return data.data;

  } catch (error) {
      return undefined;
  }
}

export async function addUser(clientData: UserInfoForm ): Promise<UserInfo | undefined> {
  try {
      const data = await Axios().post(`auth/register`, clientData );
      return data.data;
  } catch (error) {
      return undefined;
  }
}

export async function getProfileInfo( id: string ): Promise<UserInfo | undefined> {
  
  try {
    console.log("daaeazeazeta", id)
      const data = await axiosWithCred.post(`auth/getProfileByUserId`, { id } );
    console.log("daaeazeazeta", id, data.data)

      return data.data;
  } catch (error) {
      return undefined;
  }
}

export async function editProfile( editInfo: EditProfileForm ): Promise<UserInfo | undefined> {
  try {
      const data = await axiosWithCred.post(`auth/updateUserInfos`, editInfo );
      return data.data;
  } catch (error) {
      return undefined;
  }
}


export const { setIsLogin, setIsAddProfile, setIsSendLogin, setProfileInfo } = profileSlice.actions

export default profileSlice.reducer