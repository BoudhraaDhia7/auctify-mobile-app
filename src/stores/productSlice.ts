import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EditProfileForm, LoginForm, ProductInfo, ProductList, UserInfo, UserInfoForm } from '../apis/interfaces';
import { Axios, axiosWithCred } from '../apis/axiosConfig';


export interface ProductState {
    productList : ProductList[];
    selectedProd : ProductList | null;
}

const initialState: ProductState = {
    productList : [],
    selectedProd : null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setproductList: (state, action: PayloadAction<ProductList[]>) => {
      state.productList = action.payload;
    },
    setSelectedProd: (state, action: PayloadAction<ProductList | null>) => {
        state.selectedProd = action.payload;
    },
  
  },
})

export async function getProductList(userId : string): Promise<ProductList[]> {
  
  try {
      const data = await axiosWithCred.post(`api/product/getProducts`, { userId });
      return data.data;

  } catch (error) {
      return [];
  }
}

export async function getInProgressProductList(userId : string): Promise<ProductList[]> {
  try {
      const data = await axiosWithCred.post(`api/product/getInProgressProducts`, { userId });
      return data.data;

  } catch (error) {
      return [];
  }
}

export async function getEndedProductList(userId : string): Promise<ProductList[]> {
  try {
      const data = await axiosWithCred.post(`api/product/getEndedProducts`, { userId });
      return data.data;

  } catch (error) {
      return [];
  }
}

export async function getParticipatedProducts(userId : string): Promise<ProductList[]> {
  try {
      const data = await axiosWithCred.post(`api/product/getParticipatedProducts`, { userId });
      return data.data;

  } catch (error) {
      return [];
  }
}


export const { setproductList, setSelectedProd } = productSlice.actions

export default productSlice.reducer