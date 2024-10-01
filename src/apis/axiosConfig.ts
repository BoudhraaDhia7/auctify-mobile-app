import axios from "axios";

export const API_URL = "http://192.168.72.131:3001/";
export const BASE_URL = "http://192.168.72.131:3001/";
export const PICT_URL = "http://192.168.72.131:3001/uploads/";
export const SOCKET_URL = "http://192.168.72.131:3001/3001/";



type HeaderType = {
    'Content-Type': string,
    'Acess-Control-Allow-Origin': string,
    'Accept': string,
}

let headers: HeaderType = {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    'Accept': "application/json"
};

export const Axios = () => {
    return axios.create({
        baseURL: API_URL,
        headers
    })
} 

export const axiosWithCred = axios.create({ baseURL: API_URL, headers });

export function setAccesToken(token: string) {
    axiosWithCred.defaults.headers["Authorization"] = `Bearer ${token}`;
}