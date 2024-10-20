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
    setEmailInfo: (state, action: PayloadAction<{ email: string }>) => {
      if (state.profileInfo) {
        state.profileInfo.email = action.payload.email;
      }
    },
    setPhoneInfo: (state, action: PayloadAction<{ phoneNumber: number }>) => {
      if (state.profileInfo) {
        state.profileInfo.phone = action.payload.phoneNumber;
      }
    }
  },
});

export async function userLogin(loginData : LoginForm ): Promise<ConnexionInfo | undefined> {
  try {
      const data = await Axios().post(`auth/login`, loginData );
      return data.data;

  } catch (error) {
      return undefined;
  }
}

export async function forgetPassword(forgetPassowrdData : {email: string} ): Promise<ConnexionInfo | undefined> {
  try {
      const data = await Axios().post(`/company/forgotPassword`, {...forgetPassowrdData, isUser: true } );
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
      const data = await axiosWithCred.post(`auth/getProfileByUserId`, { id } );

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

export async function editEmail( editInfo: { id : string, email : string, confirmEmail : string } ): Promise<UserInfo | undefined> {
  try {
      const data = await axiosWithCred.post(`auth/changeUserEmailRequest`, editInfo );
      return data.data;
  } catch (error) {
      return undefined;
  }
}

export async function editPhone( editInfo: { id : string, phoneNumber : number, confirmPhoneNumber : number } ): Promise<UserInfo | undefined> {
  try {
      const data = await axiosWithCred.post(`auth/changePhone`, editInfo );
      return data.data;
  } catch (error) {
      return undefined;
  }
}

export async function editPassword( editInfo: { id : string, password : string, confirmPassword : string } ): Promise<UserInfo | undefined> {
  try {
      const data = await axiosWithCred.post(`auth/changePassword`, editInfo );
      return data.data;
  } catch (error) {
      return undefined;
  }
}

export async function getTransaction( id: string ): Promise<UserInfo | undefined> {
  
  try {
      const data = await axiosWithCred.post(`auth/getTransaction`, { id } );

      return data.data;
  } catch (error) {
      return undefined;
  }
}

export async function getAuctionHistory( id: string ): Promise<UserInfo | undefined> {
  
  try {
      const data = await axiosWithCred.get(`auth/getAuctionHistory/${id}`);

      return data.data;
  } catch (error) {
      return undefined;
  }
}
export const { setIsLogin, setIsAddProfile, setIsSendLogin, setProfileInfo, setEmailInfo, setPhoneInfo  } = profileSlice.actions

export default profileSlice.reducer