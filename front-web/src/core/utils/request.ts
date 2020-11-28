import axios, {Method} from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET } from './auth';


type RequestParam = {
 method?: Method;
 url:string;
 data?: object | string;
 params?: object;
 headers?:object;
}

type LoginData = {
    username:string;
    password:string;
}

const BASE_URL = 'http://localhost:8080';

export const makeRequest = ({ method = 'GET', url, data, params, headers}: RequestParam) =>{
    return axios({
        method, // nao foi passado um valor pois chave e valor tem o mesmo nome
        url: `${BASE_URL}${url}` ,
        data,
        params,
        headers
        
    });
};


export const makeLogin = (loginData : LoginData) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        //instalação do qs yarn add qs + yarn add @types/qs
    }

    const payload = qs.stringify({...loginData, grant_type: 'password'});

    return makeRequest({url: '/oauth/token', data:payload, method: 'POST', headers })

}