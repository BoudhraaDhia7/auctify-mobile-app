export interface UploadedFile {
    productPicture : string;
    filePath : string;
    fileType : string;
    fileSize : number;
}

export interface UserInfo {
    _id : string;
    userName : string;
    firstName : string;
    lastName : string;
    avatar : string;
    address :  string;
    city :  string;
    email :  string;
    phone :  number;
    password? : string,
    amountRecieved :  number;
    amountSent :  number;
    status :  number;
    role :  number;
    solde :  number;
    wallet_code :  number;
    created_at :  string;
    updatedAt :  string; 
}

export interface CompanyInfo {
    _id : string;
    userName : string;
    companyName : string;
    responsable : string;
    matricule_fiscale : string;
    address :  string;
    city :  string;
    country :  string;
    email :  string;
    phone :  number;
    password? : string,
    status :  number;
    role :  number;
    logo :  number;
    commerceRegister : number;
    created_at :  string;
    updatedAt :  string; 
    id?: string;
}

export interface ProductInfo {
    _id : string;
    status : number;
    name : string;
    files : UploadedFile[];
    company : CompanyInfo;
    price: number;
    description : string;
    created_at : string;
    updatedAt : string;
}

export interface ProductList {
    _id : string;
    total : number;
    myTotal : number;
    prodName : string;
    prodPrice : number;
    prodDescription : string;
    prodPicture : UploadedFile[];
    prodBenefit : number;
    companyId : string;
    companyName : string;
    companyLogo : string;
    prodDate : string;
    openDate : string;
    prodStatus : number
}


export interface UserInfoForm {
    userName : string;
    firstName : string;
    lastName : string;
    avatar? : string;
    address :  string;
    city :  string;
    email :  string;
    phone :  number;
    status :  number;
    role :  number;
    wallet_code : number,
    password : string;
}

export interface EditProfileForm {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    address: string;
    city: string;
};


export interface LoginForm {
    userName : string;
    password : string;
}

export interface AlertError {
    isErrorAlert : boolean;
    alertErrorType : string;
    alertErrorMessage : string; 
}

export interface ParticipateForm {
    player : string;
    product : string;
    amountGiven : number; 
}

export interface ParticipateItemData {
    product : string
    player : string
    amountGiven : number
    date : string
    _id : string
}

export interface ParticipateData {
    message : string;
    participation : ParticipateItemData;
}

export interface searchPhoneData {
    id? : string;
    firstName? : string;
    lastName? : string;
    phone? : number;
    avatar? : string;
    message : string;
}


export interface SendSoldeData {
    message : string;
}

export interface SoldeRequestForm {
    userId : string;
    fromId : string | undefined;
    amount : number;
}

export interface SoldeRequestData {
    userId : string;
    fromId : string;
    amount : number;
    date : string;
    status : string;
    _id : string;
}


/* Auctions ------------------------------------ */ 
export interface AuctionMembers {
    _id : string;
    nickname : string;
    idSocket : string;
    idUser : string;
    idProduct : string;
    avatar : string;
    status : number;
    amount : number;
    entryDate : string;
}

export interface AuctionClassment {
    _id : string;
    totalSolde : number;
    totalTime : number;
    betUserName : string;
    betAvatar : string;
    betLastName : string;
    betfirstName : string;
}