import { axiosWithCred } from "./axiosConfig";
import { AuctionClassment, AuctionMembers, SoldeRequestData, SoldeRequestForm, ParticipateData, ParticipateForm, ProductList, SendSoldeData, searchPhoneData } from "./interfaces";


export async function participateProduct(participInfo : ParticipateForm): Promise<ParticipateData | undefined> {
    console.log(participInfo);
    try {
        const { data } : { data: ParticipateData } = await axiosWithCred.post('participant/registerForProduct', participInfo);
        return data;
    } catch (error) {
        return undefined;
    }
}

export async function searchPhoneByNumber(userId: string, userPhone : number ): Promise<searchPhoneData | undefined> {
    try {
        const { data } : { data: searchPhoneData } = await axiosWithCred.post('api/wallet/getUserByPhone', { userId, userPhone });
        return data;
    } catch (error) {
        return undefined;
    }
}

export async function sendSoldeToUser(userId: string, sender : String, reciever : string, amountGiven : number  ): Promise<SendSoldeData | undefined> {
    try {
        const { data } : { data: SendSoldeData } = await axiosWithCred.post('api/wallet/sendSoldeToUser', { userId, sender, reciever, amountGiven });
        return data;
    } catch (error) {
        return undefined;
    }
}

export async function sendSoldeRequest( request : SoldeRequestForm ): Promise<SoldeRequestData | undefined> {
    try {
        const { data } : { data: SoldeRequestData } = await axiosWithCred.post('api/wallet/sendSoldeRequest', request);
        return data;
    } catch (error) {
        return undefined;
    }
}


export async function getAuctionById( userId: string, productId: string ): Promise<ProductList[] | undefined> {
    try {
        const { data } : { data: ProductList[] } = await axiosWithCred.post('api/product/getAuctionById/', {userId, productId});
        console.log("ddd ", data)
        return data;
    } catch (error) {
        return undefined;
    }
}



/* ----------- Cart Pack ------------------------------------- */
//get all pack
export async function getAllPack( ): Promise<any[] | undefined> {
    try {
        const { data } : { data: ProductList[] } = await axiosWithCred.get('setting/getAllPacks');
        return data;
    } catch (error) {
        return undefined;
    }
}
//Buy pack
export async function buyPack(id: string): Promise<any | undefined> {
    console.log("id", id)
    try {
      const { data } : { data: any } = await axiosWithCred.post('product/buyPack', {
        packId: id, 
      });
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'achat du pack:', error);
      return undefined;
    }
  }



/* ----------- Auctions ------------------------------------- */
export async function getAuctionMembers( productId : string ): Promise<AuctionMembers[] | undefined> {
    try {
        const { data } : { data: AuctionMembers[] } = await axiosWithCred.get('api/auctions/getAuctionMembers/' + productId);
        return data;
    } catch (error) {
        return undefined;
    }
}

export async function getAuctionClassement( userId: string, productId: string  ): Promise<AuctionClassment[] | undefined> {
    try {
        const { data } : { data: AuctionClassment[] } = await axiosWithCred.post('api/auctions/getAuctionClassment/', {userId, productId});
        return data;
    } catch (error) {
        return undefined;
    }
}

export async function winAuction( productId: string  ): Promise<any[] | undefined> {
    try {
        const { data } : { data: any[] } = await axiosWithCred.post('winner/winner', {productId});
        return data;
    } catch (error) {
        return undefined;
    }
}

/* ----------- Notificaton ------------------------------------- */


export async function getNotification( ): Promise<any[] | undefined> {
    try {
        const { data } : { data: any[] } = await axiosWithCred.get('notifications/getNotifications');
        return data;
    } catch (error) {
        return undefined;
    }
}