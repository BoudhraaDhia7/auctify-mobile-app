export interface MiseAuctifySended {
    idUser : string;
    idProduct : string;
    amount : number;
    duration : number;
}

export interface UserInfoSended {
    idUser : string;
    idProduct : string;
    nickname : string;
    avatar : string;
    amount : number;
}

export interface UserInfoRecieved {
    idUser : string;
    idSocket : string;
    idProduct : string;
    nickname : string;
    avatar : string;
    amount : number;
}
